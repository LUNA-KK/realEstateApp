"use client";

import RecommendCard from "../recommendCard";
import styles from "./index.module.css";
import { authFetch } from "@/app/util/authFetch";
import { useCallback, useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import useFileterStore from "@/app/store/useFilterStore";

// 디바운스 함수 (간단한 버전)
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
}

interface WishlistItem {
  pid: number;
  userId: string;
  ptitle: string;
  content: string;
  pimg: string;
  views: number;
  createdAt: string;
}

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
  pimg: "",
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
  const [wishList, setWishList] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const trigger = useRef(true);
  const { transactionType, purpose, maxPrice, maxRentPrce } = useFileterStore();

  const fetchData = useCallback(async () => {
    if (isLoading || !trigger.current) return;
    setIsLoading(true);
    const response = await authFetch({
      // url: `/api/house-board/create?page=${pageNumber.current}`,
      url: `${process.env.NEXT_PUBLIC_API_PATH}/house-board/list?page=${
        pageNumber.current
      }&maxPrice=${maxPrice}&maxRentPrce=${maxRentPrce}&${
        transactionType ? `transactionType=${transactionType}` : ""
      }&${purpose ? `purpose=${purpose}` : ""}`,
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

  const getWishList = useCallback(async () => {
    const uid = sessionStorage.getItem("userId");
    if (!uid) return;
    const response = await authFetch({
      url: `/api/wish/list`,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch wishlist");
    }
    const wishList = await response.json();
    setWishList(wishList);
  }, []);

  useEffect(() => {
    const fetchSeq = async () => {
      await fetchData();
      await getWishList();
    };

    const debouncedFetchData = debounce(fetchSeq, 300);
    const observer = new IntersectionObserver(
      () => {
        debouncedFetchData();
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
            src={data.pimg}
            wishilist={wishList.map((item) => item.pid)}
          />
        ))}
        {data.length === 0 && !isLoading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            검색 결과가 없어요.
          </div>
        )}
        <div className={styles.loading}>
          {isLoading && <CircularProgress />}
        </div>
      </div>
      <div ref={targetDiv} />
    </div>
  );
}
