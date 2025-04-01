"use client";

import Button from "@/components/Button";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { useSampleHouseList } from "@/app/store/useSampleHouseList";

const mock = {
  houseId: 1,
  buildingName: "강남 타워",
  purpose: "주거용",
  transactionType: "매매",
  price: 1000000000,
  maintenanceFee: 200000,
  address: "서울특별시 강남구 테헤란로 123",
  addressDetail: "강남타워 101호",
  exclusiveArea: 84.5,
  supplyArea: 105.2,
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [liked, setLiked] = useState(false);
  const sample = useSampleHouseList((state) => state.sampleHouseList).find(
    (house) => house.houseid === Number(id)
  );
  const t = useSampleHouseList((state) => state.sampleHouseList);

  console.log(id);
  console.log(t);

  useEffect(() => {
    const likeInfo = JSON.parse(localStorage.getItem("liked") || "[]");
    if (likeInfo.includes(Number(id))) {
      setLiked(true);
    }
  }, []);

  if (!sample) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.back}>
        <Image
          onClick={() => router.back()}
          src="/back.svg"
          alt="back"
          width={20}
          height={20}
        />
      </div>
      <img className={styles.image} src="/housePicture.jpg" />
      <div className={styles.layout}>
        <div className={styles["button-wrapper"]}>
          <div className={styles.svg}>
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
          </div>
          <div className={styles.inquiry}>
            <Button>문의하기</Button>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.title}>매물 정보</div>
          <div></div>
          <div className={styles.line}>
            매물 종류 <div>{mock.purpose}</div>
          </div>
          <div className={styles.line}>
            거래 유형 <div>{sample.transactionType}</div>
          </div>
          <div className={styles.line}>
            가격 <div>{sample.price}원</div>
          </div>
          <div className={styles.line}>
            면적{" "}
            <div>
              {mock.exclusiveArea} m<sup>2</sup>
            </div>
          </div>
          <div className={styles.line}>준공년도</div>
          <div className={styles.line}>세대수</div>
        </div>
        <div className={styles.container}>
          <div className={styles.title}>매물 소개</div>
          <div></div>
          <div>햇빛이 잘 드는 집입니다.</div>
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
