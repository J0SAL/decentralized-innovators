import React, { useEffect, useState } from "react";
import {
  createLightNode,
  waitForRemotePeer,
  createEncoder,
  createDecoder,
  PageDirection,
} from "@waku/sdk";
import protobuf from "protobufjs";
import "../../App.css";
import "../../Chat.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import AttachFile from "@mui/icons-material/AttachFile";
import MoreVert from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
const Waku = (props) => {
  const [node, setNode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [encoder, setEncoder] = useState(null);
  const topic = "0x11857ebd4Bd7c15509A1cF23362848e6B89Bd30C";
  const userAddress = "User";
  useEffect(() => {
    console.log("Starting Waku Node...");
    const startWakuNode = async () => {
      console.log("Creating Waku Node...");
      const wakuNode = await createLightNode({ defaultBootstrap: true });
      console.log("Starting Waku Node...", wakuNode);
      await wakuNode.start();
      console.log("Waku Node started!");
      console.log("Waiting for remote peer...");
      await waitForRemotePeer(wakuNode);
      console.log("Remote peer found!");
      const contentTopic = topic;
      const newEncoder = createEncoder({ contentTopic });
      setEncoder(newEncoder);
      setNode(wakuNode);
      // console.log("Waku Node created!", node);
      receiveMessages(wakuNode);
    };

    startWakuNode();

    return () => {
      if (node) {
        node.stop();
      }
    };
  }, []);

  const ChatMessage = new protobuf.Type("ChatMessage")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("sender", 2, "string"))
    .add(new protobuf.Field("message", 3, "string"));

  const receiveMessages = async (wakuNode = node) => {
    console.log("Receiving messages...", wakuNode);
    if (wakuNode) {
      // empty the messages array
      setMessages([]);
      const contentTopic = topic;
      const decoder = createDecoder(contentTopic);
      console.log("Decoder:", decoder);
      const callback = (wakuMessage) => {
        if (!wakuMessage.payload) return;
        const messageObj = ChatMessage.decode(wakuMessage.payload);
        setMessages((prevMessages) => [...prevMessages, messageObj]);
      };

      // Retrieve historical or missed messages
      const options = {
        pageDirection: PageDirection.BACKWARD, // Most recent page first
      };
      try {
        await wakuNode.store.queryWithOrderedCallback(
          [decoder],
          callback,
          options
        );
      } catch (error) {
        console.log("Error:", error);
      }

      console.log("Messages received!");
    }
  };

  // useEffect(() => {
  //   receiveMessages();
  // }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust format as needed
  };

  const sendMessage = async () => {
    console.log("Sending message...", node);
    if (node) {
      const protoMessage = ChatMessage.create({
        timestamp: Date.now(),
        sender: userAddress,
        message: inputMessage,
      });
      console.log("Proto Message:", protoMessage);
      const serialisedMessage = ChatMessage.encode(protoMessage).finish();
      console.log("Serialised Message:", serialisedMessage);
      try {
        const resp = await node.lightPush.send(encoder, {
          payload: serialisedMessage,
        });
        console.log("Response:", resp);
      } catch (error) {
        console.log("Error:", error);
      }

      // Update state with the new message
      setMessages((prevMessages) => [
        {
          sender: userAddress,
          message: inputMessage,
          timestamp: Date.now(),
        },
        ...prevMessages,
      ]);

      setInputMessage("");
      console.log("Message sent successfully!");
      // setTimeout(() => {
      //   setInputMessage("");
      //   receiveMessages();
      // }, 5000);
    }
  };

  // return (
  //   <div className="waku-chat">
  //     <div className="chat-window">
  //       {messages
  //         .slice()
  //         .reverse()
  //         .map((message, index) => (
  //           <div key={index} className="chat-message">
  //             <strong>{message.sender}:</strong> {message.message} (
  //             {formatTimestamp(message.timestamp)})
  //           </div>
  //         ))}
  //     </div>
  //     <div className="input-container">
  //       <input
  //         type="text"
  //         value={inputMessage}
  //         onChange={(e) => setInputMessage(e.target.value)}
  //         placeholder="Type your message..."
  //       />
  //       <button onClick={sendMessage}>Send</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{topic}</h3>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages
          .slice()
          .reverse()
          .map((message) => (
            <p
              className={`chat__message ${
                message.sender === userAddress
                  ? "chat__receiver"
                  : "chat__message2"
              }`}
            >
              {message.message}

              <span className="chat__timestamp">
                {formatTimestamp(message.timestamp)}
              </span>
            </p>
          ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Waku;
