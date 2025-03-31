"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Recommend from "./recommend";
import FilterableObject from "./filterableObject";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import FilterButtons from "./filterButtons";

export default function Main() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Button onClick={() => router.push("/maps")}>
        <Image src="/marker-main.svg" alt="marker 1" width={20} height={20} />
        지도로 보기
      </Button>
      <Recommend />
      <div className={styles.divider} />
      <FilterButtons />
      <FilterableObject />
      <button className={styles.button}>매물등록</button>
    </div>
  );
}
