import Button from "@/components/Button";
import { useStep } from "../../useStep";
import { useHouseStore } from "../../useHouseStore";
import styles from "../index.module.css";

const type = [
  {
    id: 1,
    name: "월세",
  },
  {
    id: 2,
    name: "전세",
  },
  {
    id: 3,
    name: "매매",
  },
  {
    id: 4,
    name: "단기",
  },
];

const Step1 = () => {
  const { transactionType, setTransactionType } = useHouseStore();
  const { nextTransactionStep } = useStep();

  const handleClick = (name: string) => {
    if (transactionType === name) {
      setTransactionType("");
      return;
    }
    setTransactionType(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {type.map((item) => (
          <Button
            classname={
              transactionType === item.name
                ? styles["button--select"]
                : styles.button
            }
            onClick={() => handleClick(item.name)}
            key={item.id}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className={styles["button-wrapper"]}>
        <Button onClick={nextTransactionStep} disabled={transactionType === ""}>
          다음
        </Button>
      </div>
    </div>
  );
};
export default function TransactionTypeForm() {
  const { transactionStep, nextStep } = useStep();
  const { transactionType, setPrice, price } = useHouseStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(Number(value));
  };

  if (transactionStep === 1) return <Step1 />;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {transactionType}
        <div className={styles["input-wrapper"]}>
          <input
            className={styles.input}
            onChange={handleChange}
            value={price}
            inputMode="numeric"
          />
          <div className={styles["search-button"]}>만원</div>
        </div>
      </div>
      <Button onClick={nextStep}>다음</Button>
    </div>
  );
}
