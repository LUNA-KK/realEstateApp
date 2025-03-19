import styles from "./recommendCard.module.css";

interface RecommendCardProps {
  houseid: number;
  type: string;
  transactionType: string;
  price: number;
  area: string;
  floor: string;
  location: string;
  isFavorite?: boolean;
}

export default function RecommendCard({
  type,
  transactionType,
  price,
  area,
  floor,
  location,
}: RecommendCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>{type}</p>
        <p>
          {transactionType} / {price}
        </p>
        <p>
          {area} / {floor}
        </p>
        <p>{location}</p>
      </div>
      <div className={styles.like}>하트</div>
    </div>
  );
}
