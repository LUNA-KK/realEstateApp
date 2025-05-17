"use client";
import { SearchOff } from "@mui/icons-material";
import styles from "./page.module.css";

const docs: string[] = [];

export default function DocumentPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>문서 분석</div>
      {docs.length > 0 ? (
        <div>
          <div>분석된 문서들</div>
          {docs.map((doc) => (
            <div>1</div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <SearchOff />
          분석된 문서가 없습니다.
        </div>
      )}
    </div>
  );
}
