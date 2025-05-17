"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import loadingLottie from "@/assets/loading.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface Message {
  role: "user" | "assistant";
  message: string;
}

interface ChatResponse {
  status: {
    code: number;
    message: string;
  };
  result: {
    message: {
      role: "assistant";
      content: string;
    };
    stopReason: string;
    inputLength: number;
    outputLength: number;
    seed: number;
    aiFilter: null | string;
  };
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    message: "안녕하세요! 무엇을 도와드릴까요?",
  },
];

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursor((prev) => prev + 1);
      if (cursor >= text.length - 1) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{text.slice(0, cursor)}</span>;
}

export default function ContractPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newMessage: Message = {
      role: "user",
      message: inputValue,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/Realty/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: inputValue,
        }
      );
      const data: ChatResponse = await response.json();
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", message: data.result.message.content },
      ]);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user" ? styles.userBubble : styles.assistantBubble
            }
          >
            {msg.role === "assistant" ? (
              <Typewriter text={msg.message} />
            ) : (
              msg.message
            )}
          </div>
        ))}
        {loading && (
          <Lottie
            animationData={loadingLottie}
            loop={true}
            style={{ width: "75px", height: "75px" }}
          />
        )}
        <div ref={bottomRef} />

        <form className={styles.inputContainer} onSubmit={onSubmit}>
          <input
            placeholder="무엇이든 물어보세요."
            onChange={onChange}
            value={inputValue}
            className={styles.input}
            disabled={loading}
          />
          <button className={styles.sendButton}>
            <SendIcon color={loading ? "action" : "inherit"} />
          </button>
        </form>
      </div>
    </div>
  );
}
