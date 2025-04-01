import Button from "@/components/Button";
import { useHouseStore } from "../../useHouseStore";
import styles from "../index.module.css";
import { useStep } from "../../useStep";

const type = [
  {
    id: 1,
    name: "원룸",
  },
  {
    id: 2,
    name: "빌라",
  },
  {
    id: 3,
    name: "오피스텔",
  },
  {
    id: 4,
    name: "아파트",
  },
  {
    id: 5,
    name: "상가",
  },
  {
    id: 6,
    name: "기타",
  },
];

export default function PurposeForm() {
  const { purpose, setPurpose } = useHouseStore();
  const { nextStep } = useStep();

  const handleClick = (name: string) => {
    if (purpose === name) {
      setPurpose("");
      return;
    }
    setPurpose(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {type.map((item) => (
          <Button
            classname={
              purpose === item.name ? styles["button--select"] : styles.button
            }
            onClick={() => handleClick(item.name)}
            key={item.id}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className={styles["button-wrapper"]}>
        <Button onClick={nextStep} disabled={purpose === ""}>
          다음
        </Button>
      </div>
    </div>
  );
}
