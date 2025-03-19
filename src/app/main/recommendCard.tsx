"use client";

import styles from "./recommendCard.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

interface RecommendCardProps {
  houseid: number;
  type: string;
  transactionType: string;
  price: number;
  area: string;
  floor: string;
  location: string;
  isFavorite?: boolean;
}

export default function RecommendCard({
  houseid,
  type,
  transactionType,
  price,
  area,
  floor,
  location,
}: RecommendCardProps) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (id: number) => {
    const likeInfo = JSON.parse(localStorage.getItem("liked") || "[]");
    if (likeInfo.includes(id)) {
      localStorage.setItem(
        "liked",
        JSON.stringify(likeInfo.filter((item: number) => item !== id))
      );
      setLiked(!liked);
      return;
    }
    localStorage.setItem("liked", JSON.stringify([...likeInfo, id]));
    setLiked(!liked);
  };

  useEffect(() => {
    const likeInfo = JSON.parse(localStorage.getItem("liked") || "[]");
    if (likeInfo.includes(houseid)) {
      setLiked(true);
    }
  }, []);

  return (
    <Link href={`/detail/${houseid}`} className={styles.container}>
      <div className={styles.content}>
        <div>{type}</div>
        <div>
          {transactionType} / {price}
        </div>
        <div>
          {area} / {floor}
        </div>
        <div>{location}</div>
      </div>
      <div className={styles.like}>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleLike(houseid);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={liked ? "red" : "none"}
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21s-6-4.35-9-7.35C0.5 10.5 1.5 6 5 4c2.5-1.5 5.5 0 7 2 1.5-2 4.5-3.5 7-2 3.5 2 4.5 6.5 2 9.65-3 3-9 7.35-9 7.35z" />
          </svg>
        </button>
      </div>
    </Link>
  );
}
