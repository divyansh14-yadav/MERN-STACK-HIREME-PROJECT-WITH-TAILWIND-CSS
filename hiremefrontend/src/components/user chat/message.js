import React, { useState } from "react";
const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };
  return (
    <div className="sticky bottom-0 bg-white pt-4 mt-5 pb-5">
      <div className="flex justify-center items-center xl:gap-5 space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 xl:p-3 p-1 border border-gray-300 rounded-full xl:w-[70%] w-[90%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Message..."
        />
           <button
          onClick={handleSend}
          className="bg-[#e0740e] text-white cursor-pointer xl:w-[100px] w-[50px] xl:px-5 px-2 xl:py-3 py-1 rounded-full font-medium "
        >
          Send
        </button>
        </div>
     
      
    </div>
  );
};
export default MessageInput;