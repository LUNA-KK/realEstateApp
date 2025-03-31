"use client";

import Image from "next/image";
import styles from "./TopNavigation.module.css";
import { usePathname, useRouter } from "next/navigation";

const matchTitle = [
  {
    name: "매물 지도",
    pathname: "/maps",
  },
  {
    name: "필터",
    pathname: "/filterPage",
  },
];

export default function TopNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const title = matchTitle.find((item) => item.pathname === pathname)?.name;
  return (
    <div className={styles.container}>
      <Image
        onClick={() => router.back()}
        src="/back.svg"
        alt="back"
        width={20}
        height={20}
      />
      <div className={styles.title}>{title}</div>
    </div>
  );
}
