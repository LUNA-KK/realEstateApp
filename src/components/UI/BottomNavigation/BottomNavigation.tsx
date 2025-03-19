"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./BottomNavigation.module.css";

const navigationInfo = [
  {
    title: "홈",
    icon: "/home.svg",
    link: "/main",
  },
  {
    title: "문서 분석",
    icon: "/document.svg",
    link: "/document",
  },
  {
    title: "계약 관리",
    icon: "/contract.svg",
    link: "/contract",
  },
  {
    title: "프로필",
    icon: "/profile.svg",
    link: "/profile",
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
          <img
            style={{ fill: pathname === item.link ? "yellow" : "red" }}
            src={item.icon}
            alt={item.title}
          />
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
}
