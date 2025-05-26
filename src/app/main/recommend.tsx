import RecommendCard from "./recommendCard";
import styles from "./recommend.module.css";
import { useSampleHouseList } from "../store/useSampleHouseList";
import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../util/authFetch";
import useRegionCode from "../store/useRegionCode";
import { CircularProgress } from "@mui/material";

const mock = {
  pid: 467,
  ptitle: "단독",
  houseType: "단독",
  transactionType: "월세",
  price: 500.0,
  rentPrc: 35.0,
  exclusiveArea: 83.0,
  address: "충청남도 천안시 동남구 북면 은지리",
  views: 1,
  writerName: "test1",
  pimg: "",
};

type APIResponse = typeof mock;

interface WishlistItem {
  pid: number;
  userId: string;
  ptitle: string;
  content: string;
  pimg: string;
  views: number;
  createdAt: string;
}

export default function Recommend() {
  const { code } = useRegionCode();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<APIResponse[]>([]);
  const [wishList, setWishList] = useState<WishlistItem[]>([]);

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

  const getRecomment = async (code: string) => {
    try {
      setIsLoading(true);

      // 앱 진입 시 크롤링
      await authFetch({
        url: `${process.env.NEXT_PUBLIC_API_PATH}/addrCode/crawl?code=${code}`,
      });

      const uid = sessionStorage.getItem("userId");
      console.log("uid", uid);

      // 크롤링 매물
      const response = await authFetch({
        url: `${process.env.NEXT_PUBLIC_API_PATH}/recommend/list?addrcode=${code}&uid=${uid}`,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data: APIResponse[] = await response.json();
      await getWishList();
      setData(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!code) {
      getRecomment("4413133000");
    } else {
      getRecomment(code);
    }
  }, [code]);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );

  if (!data || data.length === 0) return null;

  return (
    <div>
      <p>추천 매물</p>
      <div className={styles.container}>
        {data.map((data) => (
          <RecommendCard
            key={data.pid}
            houseid={data.pid}
            type={data.houseType}
            transactionType={data.transactionType}
            price={data.price}
            area={`${data.exclusiveArea}m²`}
            location={data.address}
            liked={wishList.some((item) => item.pid === data.pid)}
          />
        ))}
      </div>
    </div>
  );
}
