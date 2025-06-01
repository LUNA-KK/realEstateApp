"use client";

import { SearchOff } from "@mui/icons-material";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const docs: string[] = [];

interface DocumentListItem {
  id: string | number;
  pid: number;
  userid: string;
  owner: string;
  issueDate: string;
  riskLevel: string;
  riskKeywords: string;
  mainWarnings: string;
  maxClaim: number;
  protectedAmount: number;
  pdfBase64: any;
  riskDetails: any;
  transactionType: string;
  purpose: string;
  ragAnswer?: string;
}

interface DocumentListItemProps {
  id: string | number;
  riskLevel: string;
  issueDate: string;
  purpose: string;
  transactionType: string;
}

const dangerMock: DocumentListItem = {
  id: "mock",
  pid: 1,
  userid: "user1",
  owner: "소유자1",
  issueDate: "2025-05-28T12:00:00Z",
  riskLevel: "위험",
  riskKeywords: "위험, 주의",
  mainWarnings: "위험 경고",
  maxClaim: 1000000,
  protectedAmount: 500000,
  pdfBase64: "base64string",
  riskDetails: {
    riskLevel: "위험",
    riskKeywords: "위험, 주의",
    mainWarnings: ["위험 경고"],
    maxClaim: 1000000,
    protectedAmount: 500000,
  },
  transactionType: "매매",
  purpose: "거주용",
};

const ListItem = ({
  id,
  riskLevel,
  issueDate,
  purpose,
  transactionType,
}: DocumentListItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/main/document/analyze/detail/${id}`);
  };
  return (
    <div className={styles["listItem-container"]} onClick={onClick}>
      <div className={styles["listItem-title"]}>
        <span
          style={{
            color:
              riskLevel === "안전"
                ? "green"
                : riskLevel === "주의"
                ? "orange"
                : "red",
          }}
        >
          {riskLevel}
        </span>{" "}
        매물 리포트
      </div>
      <div className={styles["listItem-subtitle"]}>
        발급일자: {new Date().toLocaleString()}
      </div>
      <div className={styles["listItem-content"]}>
        {transactionType}, {purpose}
      </div>
    </div>
  );
};

export default function DocumentPage() {
  const [list, setList] = useState<DocumentListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDocs = async () => {
      try {
        const response = await fetch("/api/document/list", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("문서 목록을 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setList((prev) => [...prev, ...data]);
      } catch (error) {
        console.error("문서 목록을 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDocs();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.loading}>
            <CircularProgress size={120} />
          </div>
        )}
      </div>
    );
  }

  const newList = list.filter((item) => item.ragAnswer);

  return (
    <div className={styles.container}>
      <div className={styles.title}>문서 분석</div>
      {list.length > 0 ? (
        <div className={styles.list}>
          <div className={styles.subtitle}>분석된 문서들</div>
          {newList.map((doc) => (
            <ListItem
              key={doc.id}
              id={doc.id}
              riskLevel={doc.riskLevel}
              issueDate={doc.issueDate}
              purpose={doc.purpose}
              transactionType={doc.transactionType}
            />
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
