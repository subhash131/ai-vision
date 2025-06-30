import asyncio
import websockets
import io
from pathlib import Path
import wave
from google import genai
from google.genai import types
import soundfile as sf  # type:ignore
import librosa
import pyaudio  # type:ignore
import os


import sys
import traceback

import cv2
import PIL.Image
import mss
import argparse
from dotenv import load_dotenv


load_dotenv()

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY, http_options={"api_version": "v1beta"})
model = "models/gemini-2.0-flash-live-001"

pya = pyaudio.PyAudio()

FORMAT = pyaudio.paInt16
CHANNELS = 1
SEND_SAMPLE_RATE = 16000
RECEIVE_SAMPLE_RATE = 24000
CHUNK_SIZE = 1024
MODEL = "models/gemini-2.0-flash-live-001"
DEFAULT_MODE = "camera"


audio_config: types.LiveConnectConfigDict = {
    "response_modalities": [types.Modality.AUDIO],
    "system_instruction": "You are a helpful assistant and answer in a friendly tone.",
}

text_config: types.LiveConnectConfigDict = {
    "response_modalities": [types.Modality.TEXT],
    "system_instruction": "You are a helpful assistant and answer in a friendly tone.",
}


async def process_text(websocket, message: str):
    async with client.aio.live.connect(model=model, config=text_config) as session:
        await session.send_client_content(
            turns={"role": "user", "parts": [{"text": message}]}, turn_complete=True
        )
        async for response in session.receive():
            print(f"Received response: {response}")
            if response.text is not None:
                print(response.text, end="")
                await websocket.send(f"{response.text}")
            if (
                response.server_content is not None
                and response.server_content.turn_complete
            ):
                await websocket.send(f"Response Complete")


async def process_audio_to_text(websocket, audio_bytes: bytes):
    """Send audio to Gemini and return the generated text."""
    buffer = io.BytesIO(audio_bytes)
    y, sr = sf.read(buffer, dtype="int16")

    out_buffer = io.BytesIO()
    sf.write(out_buffer, y, sr, format="RAW", subtype="PCM_16")
    out_buffer.seek(0)

    async with client.aio.live.connect(model=model, config=text_config) as session:
        await session.send_realtime_input(
            audio=types.Blob(data=out_buffer.read(), mime_type="audio/pcm;rate=16000")
        )
        async for response in session.receive():
            # print(f"Received response: {response}")
            if response.text is not None:
                # print(response.text, end="")
                await websocket.send(f"{response.text}")
            if (
                response.server_content is not None
                and response.server_content.turn_complete
            ):
                await websocket.send(f"Response Complete")


async def process_audio(audio_bytes: bytes) -> bytes:
    """Send audio to Gemini and return the generated audio."""
    buffer = io.BytesIO(audio_bytes)
    y, sr = sf.read(buffer, dtype="int16")

    out_buffer = io.BytesIO()
    sf.write(out_buffer, y, sr, format="RAW", subtype="PCM_16")
    out_buffer.seek(0)

    async with client.aio.live.connect(model=model, config=audio_config) as session:
        await session.send_realtime_input(
            audio=types.Blob(data=out_buffer.read(), mime_type="audio/pcm;rate=16000")
        )

        response_audio = io.BytesIO()
        wf = wave.open(response_audio, "wb")
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)

        async for response in session.receive():
            if response.data:
                wf.writeframes(response.data)

        wf.close()
        return response_audio.getvalue()


async def handler(websocket, path=None):
    print(f"Client connected: {websocket.remote_address}")
    try:
        async for message in websocket:
            if isinstance(message, bytes):
                print("Received audio from client")
                await process_audio_to_text(websocket, message)
                print("Sent Gemini response audio to client")
            else:
                print("Received text ", message)
                await process_text(websocket, message)

    except websockets.ConnectionClosed:
        print(f"Connection closed: {websocket.remote_address}")


async def main():
    # Define the host and port for the server
    host = "localhost"
    port = 8765  # A common port for WebSocket development

    # Start the WebSocket server
    async with websockets.serve(handler, host, port):
        print(f"WebSocket server started on ws://{host}:{port}")
        await asyncio.Future()  # Run forever until interrupted


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server shutting down...")
