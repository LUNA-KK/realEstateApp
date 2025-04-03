import { useSampleHouseList } from "@/app/store/useSampleHouseList";
import RecommendCard from "../recommendCard";
import styles from "./index.module.css";

export default function FilterableObject() {
  const sampleHouseList = useSampleHouseList((state) => state.sampleHouseList);
  return (
    <div>
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
