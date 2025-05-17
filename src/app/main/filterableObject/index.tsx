"use client";

import { useSampleHouseList } from "@/app/store/useSampleHouseList";
import RecommendCard from "../recommendCard";
import styles from "./index.module.css";
import { authFetch } from "@/app/util/authFetch";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [data, setData] = useState<Response[]>([]);

  const fetchData = useCallback(async () => {
    const response = await authFetch({
      url: `${process.env.NEXT_PUBLIC_API_PATH}/house-board/list?page=${pageNumber.current}`,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
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
            price={data.price}
            area={`${data.exclusiveArea}m²`}
            floor={`${data.floor}층`}
            location={data.address}
          />
        ))}
      </div>
      <div ref={targetDiv} />
    </div>
  );
}
