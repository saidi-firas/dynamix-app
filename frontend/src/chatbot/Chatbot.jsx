import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import Voice from "./Voice";

const API_KEY = "";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "As chatbot of customer service for dynamix shop Explain things like you're talking to client in online shop selling clothes ).",
};

function Chatbot() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [visible, setVisible] = useState(true);

  const handelvisible = () => {
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  const [messages, setMessages] = useState([
    {
      message:
        "Welcome to our online store Dynamix shop! How can I assist you today?",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      name: "John",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
  
    const storeInfo =
      "Dynamix is an online clothing store that offers a wide range of fashionable clothing for men, women, and kids. The store is dedicated to providing customers with high-quality clothing at affordable prices, and it specializes in three categories: men's, women's, and kids' clothing. Dynamix is located in the beautiful city of Bizerte, where it strives to provide customers with the best shopping experience possible,also user can pay onligne just with paypal or credit cards ";

    const lastMessage = chatMessages[chatMessages.length - 1];
    const userMessage = lastMessage.message.toLowerCase();

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    if (
      userMessage.includes("store") ||
      userMessage.includes("shop") ||
      userMessage.includes("pay") ||
      userMessage.includes("clothing") ||
      userMessage.includes("products")
    ) {
      apiMessages.push({ role: "assistant", content: storeInfo });
    }
    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="row" style={{ height: "80vh" }}>
      <div className="col-lg-8 col-md-12 order-lg-1 order-md-2 custom-height">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Dynamix Bot is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message Key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              onSend={handleSend}
              style={{ backgroundColor: "whitesmoke" }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
      <div className="col-lg-4 col-md-12 order-lg-2 order-md-1 mt-3 mt-lg-0">
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                borderRadius: "20px",
                marginBottom: "5px",
                marginRight: "5px",
              }}
              className="btn btn-primary"
              onClick={handelvisible}
            >
              {visible ? "Speech to Text" : "About Chatbot"}
            </button>
            <Link
              to="/"
              className="btn btn-primary"
              style={{
                borderRadius: "20px",
                marginBottom: "5px",
                marginRight: "5px",
              }}
            >
              Back To Shopping Now
            </Link>
            <Link
              to="/cart"
              className="btn btn-primary"
              style={{
                borderRadius: "20px",
                marginBottom: "5px",
                marginRight: "5px",
              }}
            >
              Go to Cart
            </Link>
          </div>
          {visible ? (
            <div
              className="card"
              style={{
                backgroundColor: "#212529",
                borderRadius: "10%",
                marginRight: "20px",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  {" "}
                  Welcome{" "}
                  <span style={{ color: "rgb(127, 186, 0)" }}>
                    Mr.{userInfo.name}
                  </span>{" "}
                  to Our Shop!
                </h5>
                <p className="card-text">
                  We're so glad you've chosen to visit our online store. May we
                  introduce you to our chatbot?
                </p>
                <p className="card-text">
                  Our chatbot is an AI-powered tool designed to help you with
                  any questions or concerns you may have about our products or
                  services. It's always available and ready to assist you with
                  anything you need.
                </p>
                <p className="card-text">
                  Simply type in your query and the chatbot will do its best to
                  provide you with a helpful response. Whether you're looking
                  for specific items, have questions about shipping, or need
                  help navigating our site, our chatbot is here to help.
                </p>
              </div>
            </div>
          ) : (
            <div className="voice">
              <Voice />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default Chatbot;
