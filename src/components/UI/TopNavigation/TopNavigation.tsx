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
  {
    name: "매물 등록",
    pathname: "/createHouse",
  },
];

interface Props {
  onclick?: () => void;
}

export default function TopNavigation({ onclick }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const title = matchTitle.find((item) => item.pathname === pathname)?.name;
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        <Image
          onClick={onclick ? onclick : () => router.back()}
          src="/back.svg"
          alt="back"
          width={20}
          height={20}
        />
      </button>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
