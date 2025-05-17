import styles from "./page.module.css";
import { Add } from "@mui/icons-material";

const left = 14; // 계약서 만료일까지 남은 일수

export default function ContractPage() {
  return (
    <div className={styles.container}>
      <div className={styles.period}>
        <div>계약서 만료일까지 {left}일 남았어요!</div>
        <div
          style={{
            cursor: "pointer",
          }}
        >
          자동 연장 바로가기 &gt;
        </div>
      </div>
      <button className={styles["add-button"]}>
        <Add />
        <div>새 계약서 작성</div>
      </button>
    </div>
  );
}
