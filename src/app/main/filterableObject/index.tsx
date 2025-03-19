import RecommendCard from "../recommendCard";
import styles from "./index.module.css";

const mockdata = [
  {
    houseid: 1,
    type: "아파트",
    transactionType: "매매",
    price: 4500,
    area: "5.49㎡",
    floor: "29층",
    location: "개포동",
    isFavorite: true,
  },
  {
    houseid: 2,
    type: "오피스텔",
    transactionType: "월세",
    price: 3000,
    area: "10.23㎡",
    floor: "10층",
    location: "서초동",
    isFavorite: false,
  },
  {
    houseid: 3,
    type: "오피스텔",
    transactionType: "월세",
    price: 3000,
    area: "10.23㎡",
    floor: "10층",
    location: "서초동",
    isFavorite: false,
  },
];

export default function FilterableObject() {
  return (
    <div>
      <div className={styles.container}>
        {mockdata.map((data) => (
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
