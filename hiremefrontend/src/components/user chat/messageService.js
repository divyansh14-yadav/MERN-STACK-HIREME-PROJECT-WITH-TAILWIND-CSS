// import axios from "axios";

// const API_URL = "https://hireme-gdlb.onrender.com/api/v1/messages"; // Change to your backend URL

// export const fetchMessages = async (senderId, receiverId) => {
//   try {
//     const response = await axios.get(API_URL, {
//       params: { senderId, receiverId },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//   }
// };

// export const sendMessage = async (senderId, receiverId, content) => {
//     console.log(senderId,receiverId,content,"io");
    
//   try {
//     const response = await axios.post(API_URL, {
//       senderId,
//       receiverId,
//       content,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
// };



import axios from "axios";

const API_URL = "https://hireme-gdlb.onrender.com/api/v1/messages";

export const fetchMessages = async (senderId, receiverId) => {
  try {
    const response = await axios.get(API_URL, {
      params: { senderId, receiverId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export const sendMessage = async (senderId, receiverId, content) => {
  try {
    const response = await axios.post(API_URL, {
      senderId,
      receiverId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
