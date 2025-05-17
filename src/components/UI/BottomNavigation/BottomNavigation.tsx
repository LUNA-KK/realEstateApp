"use client";

import { usePathname, useRouter } from "next/navigation";
import { Article, Home, ChatBubble, AccountCircle } from "@mui/icons-material";
import styles from "./BottomNavigation.module.css";

const navigationInfo = [
  {
    title: "홈",
    icon: <Home />,
    passive: <Home color="action" />,
    link: "/main",
  },
  {
    title: "문서 분석",
    icon: <Article />,
    passive: <Article color="action" />,
    link: "/main/document",
  },
  {
    title: "챗봇",
    icon: <ChatBubble />,
    passive: <ChatBubble color="action" />,
    link: "/main/chatbot",
  },
  {
    title: "프로필",
    icon: <AccountCircle />,
    passive: <AccountCircle color="action" />,
    link: "/main/contract",
  },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      {navigationInfo.map((item) => (
        <button
          onClick={() => router.push(item.link)}
          className={styles.item}
          key={item.link}
        >
          {pathname === item.link ? item.icon : item.passive}
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
}
