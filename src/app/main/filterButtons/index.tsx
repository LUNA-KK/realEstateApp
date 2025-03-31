"use client";

import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import Button from "@/components/Button";

interface FilterButtonProps {
  title: string;
}

const filterTitle = ["매물 종류", "거래 방식", "가격", "면적"];

export default function FilterButtons() {
  const router = useRouter();
  const onclick = () => router.push("/filterPage");
  return (
    <div className={styles.container}>
      {filterTitle.map((title, idx) => (
        <Button key={idx} classname={styles.button} onClick={onclick}>
          {title} <img src="/arrow-down.svg" />
        </Button>
      ))}
    </div>
  );
}
