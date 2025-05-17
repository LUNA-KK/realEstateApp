"use client";

import Button from "@/components/Button";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { useSampleHouseList } from "@/app/store/useSampleHouseList";
import { authFetch } from "@/app/util/authFetch";

const mock = {
  userName: "test",
  houseBoardDTO: {
    pid: 13,
    userName: "test",
    ptitle: "메물 등록",
    content: "정보",
    pimg: "test.jpg",
    views: 7,
    createdAt: "2025-04-25T00:34:32",
  },
  houseInfoDTO: {
    houseId: 8,
    pid: 13,
    buildingName: "name",
    purpose: "주거용",
    transactionType: "매매",
    price: 100.0,
    maintenanceFee: 100.0,
    address: "서울 관악구 과천대로 851",
    addressDetail: "상세주소",
    exclusiveArea: 0.0,
    supplyArea: 100.0,
    rooms: 3,
    bathrooms: 2,
    floor: 10,
    direction: "남향",
    builtYear: "2015",
    loanAvailable: "가능",
    pet: "가능",
    parking: "가능",
    houseDetail: "정보",
  },
};

type DetailResponse = typeof mock;

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [liked, setLiked] = useState(false);
  const [houseDetail, setHouseDetail] = useState<DetailResponse | null>(null);
  const [error, setError] = useState<any>(false);

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
    if (likeInfo.includes(Number(id))) {
      setLiked(true);
    }
    const getImage = async (url: string) => {
      const get = await fetch(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      return get;
    };
    const fetchData = async () => {
      const response = await authFetch({
        url: `${process.env.NEXT_PUBLIC_API_PATH}/house-board/${id}`,
      });
      if (!response.ok) {
        setError(true);
        return;
      }
      const data = await response.json();
      const imageUrl = `${process.env.NEXT_PUBLIC_PATH}${data.houseBoardDTO.pimg}`;
      const imageResponse = await getImage(imageUrl);
      console.log(imageResponse);
      setHouseDetail(data);
    };
    fetchData();
  }, []);

  if (error) {
    alert("잘못된 접근입니다.");
    router.push("/main");
  }
  if (!houseDetail) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.back}>
        <Image
          onClick={() => router.back()}
          src={`${process.env.NEXT_PUBLIC_PATH}${houseDetail.houseBoardDTO.pimg}`}
          alt="img"
          width={20}
          height={20}
          unoptimized
        />
      </div>
      <img className={styles.image} src="/housePicture.jpg" />
      <div className={styles.layout}>
        <div className={styles["button-wrapper"]}>
          <button onClick={() => toggleLike(Number(id))} className={styles.svg}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill={liked ? "red" : "none"}
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
            가격 <div>{houseDetail.houseInfoDTO.price}만원</div>
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
        <Button>등기부등본 분석 보러가기</Button>
      </div>
    </div>
  );
}
