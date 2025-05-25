"use client";

import styles from "./recommendCard.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface RecommendCardProps {
  houseid: number;
  type: string;
  transactionType: string;
  price: number;
  area: string;
  location: string;
  isFavorite?: boolean;
  src?: string;
}

export default function RecommendCard({
  houseid,
  type,
  transactionType,
  price,
  area,
  location,
  src,
}: RecommendCardProps) {
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

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

    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      if (width > 300) {
        setShow(true);
      }
    }
  }, []);

  return (
    <Link
      href={`/houseDetail/${houseid}`}
      className={styles.container}
      ref={ref}
    >
      {show && (
        <img src={src || "/housePicture.jpg"} className={styles.image} />
      )}
      <div className={styles.content}>
        <div>{type}</div>
        <div>
          {transactionType} / {price}만원
        </div>
        <div>{area}</div>
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
