// import React, { useEffect, useRef } from "react";
// import ChatDashboard from "./chatDashboard";

// const UserChat = ({ messages, currentUserId, serviceDetaildList }) => {
//   const bottomRef = useRef();
//   console.log(currentUserId, "usid");

//   console.log(serviceDetaildList, "777778");

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     serviceDetaildList ? (
//       <ChatDashboard serviceDetaildList={serviceDetaildList} />
//     ) : null;
//   }, [serviceDetaildList]);
  
//   return (
//     <div className="h-[500px] bg-white border rounded-xl shadow-inner p-5 space-y-4 overflow-scroll">
//       {messages.map((msg, index) => {
//         const isSender = msg.senderId._id === currentUserId;

//         console.log(msg.senderId, currentUserId, "hellomsg");

//         return (
//           <div
//             key={msg._id || index}
//             className={`w-full flex ${
//               isSender ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
//                 isSender
//                   ? "bg-blue-600 text-black rounded-br-none"
//                   : "bg-gray-200 text-gray-800 rounded-bl-none"
//               }`}
//             >
//               {msg.content}
//             </div>
//           </div>
//         );
//       })}
//       <div ref={bottomRef} />
//     </div>
//   );
// };

// export default UserChat;


// import React, { useEffect, useRef } from "react";
// import ChatDashboard from "./chatDashboard";

// const UserChat = ({ messages, currentUserId, serviceDetaildList }) => {
//   const bottomRef = useRef();

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <div className="h-[500px] bg-white border rounded-xl shadow-inner p-5 space-y-4 overflow-scroll">
//         {messages.map((msg, index) => {
//           const isSender = msg.senderId._id === currentUserId;

//           return (
//             <div
//               key={msg._id || index}
//               className={`w-full flex ${
//                 isSender ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
//                   isSender
//                     ? "bg-blue-600 text-black rounded-br-none"
//                     : "bg-gray-200 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </div>
//     </>
//   );
// };

// export default UserChat;



import React, { useEffect, useRef } from "react";

const UserChat = ({ messages, currentUserId }) => {
  const bottomRef = useRef();
console.log(currentUserId,"dashid");
console.log(messages,"dasmesss");


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

  }, [messages]);

  
  return (
    <div className=" h-[350px] bg-white rounded-xl shadow-inner p-5 space-y-4">

      {messages.map((msg, index) => {
      //  const isSender = msg.senderId._id === currentUserId;
      const senderId = typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;
      const isSender = senderId === currentUserId;

        return (
          <div
            key={msg._id || index}
            className={`w-full flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
                isSender
                  ? "bg-[#e0740e] text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default UserChat;
