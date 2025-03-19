"use client";

import Button from "@/components/Button";
import Input from "@/components/UI/Input/Input";
import styles from "@/app/page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  id: "",
  password: "",
  nickname: "",
};

export default function Register() {
  const [user, setUser] = useState(initialState);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    if (Object.values(user).every((value) => value)) {
      alert("회원가입 성공");
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <div className={styles.title}>
          서비스 이용을 위해
          <br />
          <span className={styles.strong}>회원가입</span>이 필요해요
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
          <Input
            value={user.nickname}
            onChange={handleChange}
            name="nickname"
            placeholder="사용하실 닉네임을 설정해주세요."
          />
        </div>
      </section>
      <section className={styles.bottom}>
        <Button onClick={submit}>회원가입 하기</Button>
      </section>
    </div>
  );
}
