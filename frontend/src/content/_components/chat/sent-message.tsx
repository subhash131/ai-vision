const SentMessage = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-fit flex items-center justify-end">
      <div className="w-fit h-fit px-2 py-1 rounded-md !bg-[#212121] max-w-[80%]">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SentMessage;
