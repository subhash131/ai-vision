const ReceivedMessage = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-10 flex items-center justify-start">
      <div className="w-fit h-fit px-2 py-1 rounded-md !bg-[#212121] max-w-[80%]">
        <p>{message} received</p>
      </div>
    </div>
  );
};

export default ReceivedMessage;
