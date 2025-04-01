import Button from "@/components/Button";
import styles from "../index.module.css";
import { useStep } from "../../useStep";

export default function ImageForm() {
  const { nextStep } = useStep();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>사진을 업로드 해주세요.</h1>
      </div>
      <Button onClick={nextStep}>다음</Button>
    </div>
  );
}
