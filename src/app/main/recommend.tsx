import RecommendCard from "./recommendCard";
import styles from "./recommend.module.css";
import { useSampleHouseList } from "../store/useSampleHouseList";

export default function Recommend() {
  const sampleHouseList = useSampleHouseList((state) => state.sampleHouseList);
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
            floor={data.floor}
            location={data.location}
          />
        ))}
      </div>
    </div>
  );
}
