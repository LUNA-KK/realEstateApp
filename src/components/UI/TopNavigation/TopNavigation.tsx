"use client";

import Image from "next/image";
import styles from "./TopNavigation.module.css";
import { useRouter } from "next/navigation";

export default function TopNavigation() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Image
        onClick={() => router.back()}
        src="/back.svg"
        alt="back"
        width={20}
        height={20}
      />
      <div className={styles.title}>매물 지도</div>
    </div>
  );
}
