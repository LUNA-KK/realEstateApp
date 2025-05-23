import RecommendCard from "./recommendCard";
import styles from "./recommend.module.css";
import { useSampleHouseList } from "../store/useSampleHouseList";
import { useEffect, useState } from "react";
import { authFetch } from "../util/authFetch";

export default function Recommend() {
  const sampleHouseList = useSampleHouseList((state) => state.sampleHouseList);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await authFetch({
        url: `${process.env.NEXT_PUBLIC_API_PATH}/house-board/recommend`,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    };
    // fetchData();
  }, []);

  return (
    <div>
      <p>추천 매물</p>
      <div className={styles.container}>
        {sampleHouseList.map((data) => (
          <RecommendCard
            key={data.houseid}
            houseid={data.houseid}
            type={data.type}
            transactionType={data.transactionType}
            price={data.price}
            area={data.area}
            location={data.location}
          />
        ))}
      </div>
    </div>
  );
}
