import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const newMessage = new Message({ senderId, receiverId, content });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort("timestamp").populate({
      path: "senderId",
      select: "firstName LastName"
    }).populate({
      path: "receiverId",
      select: "firstName LastName"
    })

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};


export const getAllUserChat = async (req, res) => {
  
  const { authId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: authId },
        { receiverId: authId }
      ]
    })
      .select("senderId receiverId")
      .populate({
        path: "senderId",
        select: "firstName"
      })
      .populate({
        path: "receiverId",
        select: "firstName"
      });

    const userMap = new Map();

    messages.forEach((msg) => {
      const sender = msg.senderId;
      const receiver = msg.receiverId;

      if (sender._id.toString() !== authId) {
        userMap.set(sender._id.toString(), { id: sender._id, firstName: sender.firstName });
      }

      if (receiver._id.toString() !== authId) {
        userMap.set(receiver._id.toString(), { id: receiver._id, firstName: receiver.firstName });
      }
    });

    const chatUsers = Array.from(userMap.values());

    res.json({ chatUsers });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

