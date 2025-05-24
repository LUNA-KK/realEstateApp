"use client";

import { useSampleHouseList } from "@/app/store/useSampleHouseList";
import RecommendCard from "../recommendCard";
import styles from "./index.module.css";
import { authFetch } from "@/app/util/authFetch";
import { useCallback, useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

const mock = {
  pid: 3,
  ptitle: "좋음",
  houseType: "원룸",
  transactionType: "월세",
  price: 0,
  rentPrc: 10,
  exclusiveArea: 20,
  address: "충남 천안시 동남구 병천면 가전8길 102",
  views: 2,
  writerName: "test1",
};

type APIResponse = typeof mock;

interface Response {
  address: string;
  exclusiveArea: number;
  floor: number;
  houseType: string;
  pid: number;
  price: number;
  ptitle: string;
  transactionType: string;
  views: number;
  writerName: string;
}

export default function FilterableObject() {
  const pageNumber = useRef(0);
  const targetDiv = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<APIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const trigger = useRef(true);

  const fetchData = useCallback(async () => {
    if (isLoading || !trigger.current) return;
    setIsLoading(true);
    const response = await authFetch({
      url: `/api/house-board/create?page=${pageNumber.current}`,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.last || data.content.length === 0) {
      trigger.current = false;
    }
    setIsLoading(false);
    pageNumber.current += 1;
    setData((prev) => [...prev, ...data.content]);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        fetchData();
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (targetDiv.current) {
      observer.observe(targetDiv.current);
    }

    return () => {
      if (targetDiv.current) {
        observer.unobserve(targetDiv.current);
      }
      setData([]);
      pageNumber.current = 0;
      observer.disconnect();
    };
  }, []);

  // const sampleHouseList = useSampleHouseList((state) => state.sampleHouseList);
  return (
    <div>
      <div className={styles.container}>
        {data.map((data) => (
          <RecommendCard
            key={data.pid}
            houseid={data.pid}
            type={data.houseType}
            transactionType={data.transactionType}
            price={data.transactionType === "월세" ? data.rentPrc : data.price}
            area={`${data.exclusiveArea}m²`}
            location={data.address}
          />
        ))}
        <div className={styles.loading}>
          {isLoading && <CircularProgress />}
        </div>
      </div>
      <div ref={targetDiv} />
    </div>
  );
}
