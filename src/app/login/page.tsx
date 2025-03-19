"use client";

import Button from "@/components/Button";
import Input from "@/components/UI/Input/Input";
import styles from "@/app/page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  id: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = useState(initialState);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    if (user.id === "test1" && user.password === "test1") {
      alert("로그인 성공");
      router.push("/main");
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <div className={styles.title}>
          서비스 이용을 위해
          <br />
          <span className={styles.strong}>로그인</span>이 필요해요
        </div>
        <div className={styles["input-container"]}>
          <Input
            value={user.id}
            onChange={handleChange}
            name="id"
            placeholder="아이디를 입력해주세요."
          />
          <Input
            value={user.password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
      </section>
      <section className={styles.bottom}>
        <Button onClick={submit}>로그인 하기</Button>
      </section>
    </div>
  );
}
