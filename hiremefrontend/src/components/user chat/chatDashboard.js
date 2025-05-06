// import React, { useEffect, useState } from "react";
// import Nav from "../nav";
// import OtherNav from "../otherNav";
// import Footer from "../footer";
// import MessageInput from "../../components/user chat/message";
// import {
//   fetchMessages,
//   sendMessage,
// } from "../../components/user chat/messageService";
// import UserChat from "../../components/user chat/userChat";
// import { io } from "socket.io-client";
// import authConfig from "../../api/config";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// const socket = io("https://hireback-1.onrender.com");

// const ChatDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   console.log(messages, "hellomessages");

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [allChatUser, setAllChatUser] = useState([]);
//   const [receiveId, setReceiveId] = useState("");
//   const [messageUpdated, setMessageUpdated] = useState(false);
//   const [serviceDetaildList, setServiceDetaildList] = useState(null);

//   const location = useLocation();
//   const { serviceId } = useParams();
//   const authId = JSON.parse(localStorage.getItem("authId"));

//   useEffect(() => {
//     const fetchChatUser = async () => {
//       try {
//         const response = await authConfig.get(`allChat/${authId}`);
//         if (response.status === 200) {
//           const users = response.data.chatUsers;
//           setAllChatUser(users);

//           if (users.length > 0) {
//             const defaultUser = users[0];
//             setSelectedUser(defaultUser);
//             setReceiveId(defaultUser.id || defaultUser._id);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching chat users:", error);
//       }
//     };
//     fetchChatUser();
//   }, [authId]);

//   useEffect(() => {
//     const loadMessages = async () => {
//       window.scrollTo(0, 0);
//       if (authId && receiveId) {
//         const messagesData = await fetchMessages(authId, receiveId);
//         setMessages(messagesData || []);
//       }
//     };
//     loadMessages();
//   }, [authId, receiveId, messageUpdated]);

//   useEffect(() => {
//     if (!authId) return;

//     socket.emit("join", authId);

//     socket.on("receive_message", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => socket.off("receive_message");
//   }, [authId]);

//   const fetchMessagesWithUser = async (receiverId, userData) => {
//     setSelectedUser(userData);
//     setReceiveId(userData.id || userData._id);
//     const messagesData = await fetchMessages(authId, receiverId);
//     setMessages(messagesData || []);
//   };

//   const handleSendMessage = async (message) => {
//     const newMessage = {
//       senderId: authId,
//       receiverId: receiveId,
//       content: message,
//     };

//     socket.emit("send_message", newMessage);

//   };
//   const [isTyping, setIsTyping] = useState(false);

//   const handleTyping = () => {
//     socket.emit('typing', { receiveId, senderId });
// };

// // Jab user ruk jaye type karna
// const handleStopTyping = () => {
//     socket.emit('stopTyping', { receiveId, senderId });
// };

// useEffect(() => {
//   socket.on('typing', (data) => {
//       if (data.senderId === otherUserId) {
//           setIsTyping(true);
//       }
//   });

//   socket.on('stopTyping', (data) => {
//       if (data.senderId === otherUserId) {
//           setIsTyping(false);
//       }
//   });

//   return () => {
//       socket.off('typing');
//       socket.off('stopTyping');
//   };
// }, []);
// let typingTimeout;

// const handleInputChange = (e) => {
//     setMessages(e.target.value);
//     socket.emit('typing', { receiveId, senderId });

//     clearTimeout(typingTimeout);
//     typingTimeout = setTimeout(() => {
//         socket.emit('stopTyping', { receiveId, senderId });
//     }, 2000); // 2 sec ke baad stopTyping emit hoga
// };

//   return (
//     <div className="bg-[#eef2f8] pb-10">
//       
//       <OtherNav />
//       <div className="w-[90%] md:w-[80%] m-auto xl:flex block justify-between gap-10 bg-white text-start rounded-md p-6 mt-10 shadow-md">

//         {/* Left section - User List */}
//         <div className="xl:w-[30%] w-full overflow-y-scroll">
//           {allChatUser.map((user) => (
//             <div
//               key={user._id}
//               onClick={() => fetchMessagesWithUser(user._id, user)}
//               className={`cursor-pointer p-4 border-b hover:bg-gray-100 ${
//                 selectedUser?._id === user._id ? "bg-blue-100" : ""
//               }`}
//             >
//               <h1 className="text-[1.1rem] font-medium">{user.firstName}</h1>
//             </div>
//           ))}
//         </div>

//         {/* Right section - Chat Area */}
//         <div className="xl:w-[70%] w-full xl:mt-0 mt-10 flex flex-col justify-between h-[500px]">
//           <div className="flex-1 overflow-y-auto">
//             {selectedUser ? (
//               <>
//                 <h2 className="text-2xl font-bold mb-6 border-b pb-3">
//                   Chat with {selectedUser.firstName}
//                 </h2>
//                 <UserChat messages={messages} currentUserId={authId} />
//               </>
//             ) : (
//               <div className="text-center text-gray-500 mt-40 text-lg">
//                 👈 Select a user to start chatting
//               </div>
//             )}
//           </div>

//           {/* Message Input */}
//           {selectedUser && <MessageInput onSendMessage={handleSendMessage} />}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );

// };

// export default ChatDashboard;
import React, { useEffect, useState, useRef } from "react";
import Nav from "../nav";
import OtherNav from "../otherNav";
import Footer from "../footer";
import MessageInput from "../../components/user chat/message";
import {
  fetchMessages,
  sendMessage,
} from "../../components/user chat/messageService";
import UserChat from "../../components/user chat/userChat";
import { io } from "socket.io-client";
import authConfig from "../../api/config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loder from "../loader/loder";

const socket = io("https://hireback-1.onrender.com");

const ChatDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allChatUser, setAllChatUser] = useState([]);
  const [receiveId, setReceiveId] = useState("");
  const [messageUpdated, setMessageUpdated] = useState(false);
  const [serviceDetaildList, setServiceDetaildList] = useState(null);
  const [typingUsers, setTypingUsers] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true); // State to manage loading of chat users
  console.log(typingUsers,"type");

  const messageListRef = useRef(null);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  const location = useLocation();
  const { serviceId } = useParams();
  const authId = JSON.parse(localStorage.getItem("authId"));

  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const response = await authConfig.get(`allChat/${authId}`);
        if (response.status === 200) {
          const users = response.data.chatUsers;
          setAllChatUser(users);
          setLoadingUsers(false); // Set loading to false once users are fetched
        }
      } catch (error) {
        console.error("Error fetching chat users:", error);
        setLoadingUsers(false); // Set loading to false even on error to avoid infinite loading
      }
    };
    fetchChatUser();
  }, [authId]);

  useEffect(() => {
    const loadMessages = async () => {
      window.scrollTo(0, 0);
      if (authId && receiveId && hasSelectedUser) {
        const messagesData = await fetchMessages(authId, receiveId);
        setMessages(messagesData || []);
        // Scroll to the bottom after messages load
        if (messageListRef.current) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
        }
      } else {
        setMessages([]); // Clear messages if no user is selected
      }
    };
    loadMessages();
  }, [authId, receiveId, messageUpdated, hasSelectedUser]);

  useEffect(() => {
    if (!authId) return;
    console.log("Socket connected:", socket.connected);
    console.log("Emitting join event with authId:", authId);
    socket.emit("join", authId);

    socket.on("receive_message", (message) => {
      if (message.senderId === receiveId || message.receiverId === receiveId) {
        setMessages((prev) => [...prev, message]);
        // Scroll to the bottom on new message
        if (messageListRef.current) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
        }
      }
    });

    socket.on("typing", (data) => {
      console.log(
        'User B received "typing" event:',
        data,
        "receiveId:",
        receiveId
      );
      if (data.senderId === receiveId) {
        setTypingUsers((prev) => ({ ...prev, [receiveId]: true }));
        console.log("User B - typingUsers state updated:", typingUsers);
      }
    });

    socket.on("stopTyping", (data) => {
      console.log(
        'User B received "stopTyping" event:',
        data,
        "receiveId:",
        receiveId
      );
      if (data.senderId === receiveId) {
        setTypingUsers((prev) => {
          const newState = { ...prev };
          delete newState[receiveId];
          console.log(
            "User B - typingUsers state updated (stopped):",
            newState
          );
          return newState;
        });
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("join");
    };
  }, [authId, receiveId]);

  const fetchMessagesWithUser = async (receiverId, userData) => {
    setSelectedUser(userData);
    setReceiveId(userData.id || userData._id);
    setHasSelectedUser(true); // Set to true when a user is selected
    // Messages will be loaded in the useEffect hook that depends on receiveId and hasSelectedUser
    console.log("receiveId:", receiveId, "selectedUser:", selectedUser);
  };

  const handleSendMessage = async (message) => {
    const newMessage = {
      senderId: authId,
      receiverId: receiveId,
      content: message,
    };

    socket.emit("send_message", newMessage);
  };

  let typingTimeout;

  const handleInputChange = (text) => {
    if (receiveId) {
      console.log(
        'User A typing - Emitting "typing" event to:',
        receiveId,
        "from:",
        authId
      );
      socket.emit("typing", { senderId: authId, receiverId: receiveId });

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        console.log(
          'User A stopped typing - Emitting "stopTyping" event to:',
          receiveId,
          "from:",
          authId
        );
        socket.emit("stopTyping", { senderId: authId, receiverId: receiveId });
      }, 1500);
    }
  };

  return (
    <div className="bg-[#eef2f8] pb-10">
      
      <OtherNav />
     {
      loadingUsers ? <Loder/> :
      <div className="w-[90%] md:w-[80%] m-auto xl:flex block justify-between gap-10 bg-white text-start rounded-md p-6 mt-10 shadow-md">
      {/* Left section - User List */}
      <div className="xl:w-[30%] w-full overflow-y-scroll border-r border-gray-200">
      {

          allChatUser.map((user) => (
            <div
              key={user._id}
              onClick={() => fetchMessagesWithUser(user._id, user)}
              className={`cursor-pointer p-3 border-b hover:bg-[#f0f2f5] ${
                selectedUser?._id === user._id ? "bg-[#e0e7ed]" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Placeholder for User Avatar */}
                <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center text-white font-semibold">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-sm font-semibold text-gray-800 truncate">
                    {user.firstName}
                  </h1>
                  {selectedUser?._id === user._id && typingUsers[user._id] && (
                    <p className="text-xs text-gray-500 italic">Typing...</p>
                  )}
                </div>
              </div>
            </div>
          ))
      }

      </div>

      {/* Right section - Chat Area */}
      <div className="xl:w-[70%] w-full xl:mt-0 mt-10 flex flex-col justify-between h-[500px]">
        {!hasSelectedUser ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-500 text-lg">
            👈 Select a user to start chatting
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto" ref={messageListRef}>
              {selectedUser && (
                <>
                  <h2 className="text-2xl font-bold mb-2 border-b pb-3">
                    Chat with {selectedUser.firstName}
                  </h2>
                  <UserChat messages={messages} currentUserId={authId} />
                </>
              )}
            </div>

            {/* Message Input */}
            {selectedUser && (
              <MessageInput
                onSendMessage={handleSendMessage}
                onInputChange={handleInputChange}
              />
            )}
          </>
        )}
      </div>
    </div>
     }
      <Footer />
    </div>
  );
};

export default ChatDashboard;
