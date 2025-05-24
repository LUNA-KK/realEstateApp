"use client";

import Button from "@/components/Button";
import Input from "@/components/UI/Input/Input";
import styles from "@/app/page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  // file: File | null;
}
const initialState: User = {
  id: "",
  password: "",
  name: "",
  phone: "",
  email: "",
  // file: null,
};

export default function Register() {
  const [user, setUser] = useState<User>(initialState);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    if (!passwordRegex.test(user.password)) {
      alert(
        "비밀번호는 영문자, 숫자, 특수문자를 포함하여 10자 이상이어야 합니다."
      );
      return;
    }
    if (Object.values(user).every((value) => value)) {
      const userObject = {
        userId: user.id,
        userPw: user.password,
        userName: user.name,
        userPhone: user.phone,
        userEmail: user.email,
      };

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      });

      if (response.status === 200 || response.status === 201) {
        alert("회원가입 성공");
        router.push("/login");
      } else {
        alert("회원가입 실패");
      }
    }
  };
  /*
  const onfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUser({
        ...user,
        file: file,
      });
    }
  };
  */

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
            value={user.name}
            onChange={handleChange}
            name="name"
            placeholder="이름을 입력해주세요."
          />

          <Input
            value={user.phone}
            onChange={handleChange}
            name="phone"
            placeholder="전화번호를 입력해주세요. ex) 010-1234-5678"
          />
          <Input
            value={user.email}
            onChange={handleChange}
            name="email"
            placeholder="이메일을 입력해주세요. ex) test@email.com"
          />
        </div>
      </section>
      <section className={styles.bottom}>
        <Button onClick={submit}>회원가입 하기</Button>
      </section>
    </div>
  );
}
