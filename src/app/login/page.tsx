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

  const submit = async () => {
    const userObject = {
      userId: user.id,
      userPw: user.password,
    };
    if (Object.values(user).every((value) => value)) {
      const response = await fetch(`api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      });
      const data = await response.json();
      if (response.status === 200) {
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
        sessionStorage.setItem("userId", user.id);
        alert("로그인 성공");
        router.push("/main");
      } else {
        alert("로그인 실패");
      }
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
        <Button onClick={submit}>로그인하기</Button>
      </section>
    </div>
  );
}
