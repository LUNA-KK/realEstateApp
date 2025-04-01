import Button from "@/components/Button";
import styles from "../index.module.css";
import { useStep } from "../../useStep";
import { useHouseStore } from "../../useHouseStore";

export default function AreaForm() {
  const { nextStep } = useStep();
  const { exclusiveArea, setExclusiveArea } = useHouseStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setExclusiveArea(Number(value));
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["input-wrapper"]}>
          <input
            className={styles.input}
            onChange={handleChange}
            value={exclusiveArea}
          />
          <div className={styles["search-button"]}>평</div>
        </div>
      </div>
      <Button onClick={nextStep}>다음</Button>
    </div>
  );
}
