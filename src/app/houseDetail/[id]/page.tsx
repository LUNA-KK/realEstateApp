"use client";

import Button from "@/components/Button";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { use } from "react";
import { useSampleHouseList } from "@/app/store/useSampleHouseList";
import { authFetch } from "@/app/util/authFetch";

const mock = {
  userName: "test1",
  houseBoardDTO: {
    pid: 3,
    userName: "test1",
    ptitle: "좋음",
    content: "좋음",
    pimg: "/images/61059c7e-53cf-4a65-a6f9-62d72c774874_housePicture.jpg",
    views: 2,
    createdAt: "2025-05-24T15:39:45",
  },
  houseInfoDTO: {
    houseId: 1,
    pid: 3,
    ownerType: "세입자",
    purpose: "원룸",
    transactionType: "월세",
    price: 0,
    maintenanceFee: 30,
    address: "충남 천안시 동남구 병천면 가전8길 102",
    addressDetail: "3동",
    exclusiveArea: 20,
    supplyArea: 100,
    rooms: 3,
    bathrooms: 2,
    direction: "남향",
    houseDetail: "좋음",
    rentPrc: 10,
    parkingPerHouseholdCount: 0,
    latitude: null,
    longitude: null,
  },
};

type DetailResponse = typeof mock;

interface WishlistItem {
  pid: number;
  userId: string;
  ptitle: string;
  content: string;
  pimg: string;
  views: number;
  createdAt: string;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [houseDetail, setHouseDetail] = useState<DetailResponse | null>(null);
  const [error, setError] = useState<any>(false);
  const [image, setImage] = useState<any>();
  const [isLiked, setIsLiked] = useState(false);
  const [wishList, setWishList] = useState<WishlistItem[]>();

  const getWishList = useCallback(async () => {
    const response = await authFetch({
      url: `/api/wish/list`,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch wishlist");
    }
    const wishList: WishlistItem[] = await response.json();
    setWishList(wishList);
    const n = wishList.map((item) => item.pid);
    const isLike = n.includes(Number(id));
    setIsLiked(isLike);
    return wishList;
  }, []);

  const onClickAnalyze = () => {
    router.push(`/main/document/analyze/${id}`);
  };

  const toggleLike = async (id: number) => {
    await authFetch({
      // url: `${process.env.NEXT_PUBLIC_API_PATH}/wishlist/${id}/toggle`,
      url: `/api/wish?id=${id}`,
      method: "POST",
    });

    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    const getImage = async (url: string) => {
      const get = await fetch(`/api/house-board/detail/image?url=${url}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      return get;
    };
    const fetchData = async () => {
      const response = await authFetch({
        url: `/api/house-board/detail/${id}`,
      });
      if (!response.ok) {
        setError(true);
        return;
      }
      const data = await response.json();
      setHouseDetail(data);
      return data;
    };
    fetchData()
      .then((res) => {
        if (!res.houseBoardDTO.pimg) {
          throw new Error("이미지 없음");
        }
        if (res.houseBoardDTO.pimg.startsWith("https")) {
          setImage(res.houseBoardDTO.pimg);
          throw new Error("자체 이미지");
        }
        return getImage(res.houseBoardDTO.pimg);
      })
      .then((res) => {
        return res.blob();
      })
      .then((res) => {
        setImage(URL.createObjectURL(res));
      })
      .catch((error) => console.error("이미지 없음"));
  }, []);

  useEffect(() => {
    getWishList();
  }, [getWishList, id]);

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

  if (error) {
    alert("잘못된 접근입니다.");
    router.push("/main");
  }
  if (!houseDetail) return null;

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.back}
        src="/back.svg"
        onClick={() => router.back()}
      />
      <img
        className={styles.image}
        src={houseDetail.houseBoardDTO.pimg ? `${image}` : "/defaultHouse.png"}
      />
      <div className={styles.layout}>
        <div className={styles["button-wrapper"]}>
          <button onClick={() => toggleLike(Number(id))} className={styles.svg}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill={isLiked ? "red" : "none"}
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s-6-4.35-9-7.35C0.5 10.5 1.5 6 5 4c2.5-1.5 5.5 0 7 2 1.5-2 4.5-3.5 7-2 3.5 2 4.5 6.5 2 9.65-3 3-9 7.35-9 7.35z" />
            </svg>
          </button>
          <div className={styles.inquiry}>
            <Button>문의하기</Button>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.title}>매물 정보</div>
          <div></div>
          <div className={styles.line}>
            매물 종류 <div>{houseDetail.houseInfoDTO.purpose}</div>
          </div>
          <div className={styles.line}>
            거래 유형 <div>{houseDetail.houseInfoDTO.transactionType}</div>
          </div>
          <div className={styles.line}>
            가격{" "}
            <div>
              {houseDetail.houseInfoDTO.transactionType === "월세"
                ? formatPrice(houseDetail.houseInfoDTO.rentPrc)
                : formatPrice(houseDetail.houseInfoDTO.price)}
            </div>
          </div>
          <div className={styles.line}>
            면적{" "}
            <div>
              {houseDetail.houseInfoDTO.exclusiveArea} m<sup>2</sup>
            </div>
          </div>
          <div className={styles.line}>준공년도</div>
          <div className={styles.line}>세대수</div>
        </div>
        <div className={styles.container}>
          <div className={styles.title}>매물 소개</div>
          <div></div>
          <div>{houseDetail.houseBoardDTO.content}</div>
        </div>
        <div>
          <div>
            <div className={styles.title}>안전한 매물인지 확인하세요.</div>
            <div>이 매물의 등기부등본을 분석했어요</div>
          </div>
        </div>
        <Button onClick={onClickAnalyze}>등기부등본 분석 보러가기</Button>
      </div>
    </div>
  );
}
