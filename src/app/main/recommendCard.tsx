"use client";

import styles from "./recommendCard.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authFetch } from "../util/authFetch";

interface RecommendCardProps {
  houseid: number;
  type: string;
  transactionType: string;
  price: number;
  area: string;
  location: string;
  isFavorite?: boolean;
  src?: string;
  liked?: boolean;
  wishilist?: number[];
}

export default function RecommendCard({
  houseid,
  type,
  transactionType,
  price,
  area,
  location,
  src,
  liked,
  wishilist,
}: RecommendCardProps) {
  const [show, setShow] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const toggleLike = async (id: number) => {
    await authFetch({
      // url: `${process.env.NEXT_PUBLIC_API_PATH}/wishlist/${id}/toggle`,
      url: `/api/wish?id=${id}`,
      method: "POST",
    });

    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      if (width > 300) {
        setShow(true);
      }
    }
  }, []);

  useEffect(() => {
    if (wishilist) {
      setIsLiked(wishilist.includes(houseid));
    }
  }, [wishilist]);

  const formatPrice = (price: number) => {
    if (price >= 10000) {
      let base = `${(price / 10000).toFixed()}억`;
      if (price % 10000 === 0) {
        return base;
      }
      return `${(price / 10000).toFixed()}억 ${price % 10000}만원`;
    }
    return `${price}만원`;
  };

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
          {transactionType} / {formatPrice(price)}
        </div>
        <div>{area}</div>
        <div style={{ whiteSpace: "pre-wrap" }}>{location}</div>
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
            fill={isLiked ? "red" : "none"}
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
