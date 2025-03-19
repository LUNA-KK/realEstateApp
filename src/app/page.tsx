"use client";

import Button from "@/components/Button";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <Image
          src={"/onboarding.svg"}
          alt="onboarding"
          width={250}
          height={250}
        />
        <div>
          안전하고 손 쉬운 부동삭 계약
          <br />
          지금 로그인하고 시작해보세요!
        </div>
      </section>
      <section className={styles.bottom}>
        <Button onClick={() => router.push("/register")}>시작하기</Button>
        <p>
          이미 계정이 있으신가요?{" "}
          <span className={styles.strong} onClick={() => router.push("/login")}>
            로그인
          </span>
          하기
        </p>
      </section>
    </div>
  );
}
