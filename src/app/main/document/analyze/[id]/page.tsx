"use client";

import { authFetch } from "@/app/util/authFetch";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { CircularProgress } from "@mui/material";
import styles from "./page.module.css";

const requestParams = {
  organization: "0002",
  phoneNo: "010-5837-3972",
  password: "3972",
  inquiryType: "1",
  recordStatus: "0",
  jointMortgageJeonseYN: "0",
  tradingYN: "0",
  electronicClosedYN: "0",
  ePrepayNo: "C47866900738",
  ePrepayPass: "dice123",
  issueType: "1",
  originDataYN: "1",
  warningSkipYN: "0",
};

const apiResponse = {
  id: 1,
  pid: 5,
  userid: "test1",
  owner: "미상",
  issueDate: "2025-05-23T00:00:00",
  riskLevel: "주의",
  riskKeywords: "근저당권",
  mainWarnings:
    "매물을 담보로 받은 융자금이 있어요. - 채권최고액과 보증금의 합이 시세의 70% 이하일 때 안전하다고 판단할 수 있어요.",
  maxClaim: 150000000,
  protectedAmount: 30000000,
  purpose: "원룸",
  transactionType: "전세",
  price: 100000.0,
  rentPrc: 40.0,
  exclusiveArea: 18.45,
  pdfBase64: "아주 긴 pdf값",
  riskDetails: null,
};

type APIResponse = typeof apiResponse;

export default function AnalyzePage() {
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isRender = useRef(true);

  useEffect(() => {
    const analyze = async () => {
      try {
        setIsLoading(true);
        const response = await authFetch({
          url: `/api/document/analyze?id=${id}`,
          // url: `${process.env.NEXT_PUBLIC_API_PATH}/house-board/${id}/analyze`,
          method: "POST",
          body: JSON.stringify(requestParams),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data: APIResponse = await response.json();
        if (!response.ok) {
          throw new Error("분석 요청에 실패했습니다.");
        }
        router.replace(`/main/document/analyze/detail/${data.id}`);
      } catch {
        router.replace("/main/document");
      } finally {
        setIsLoading(false);
      }
    };

    if (isRender.current) {
      analyze();
      isRender.current = false;
    }
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <CircularProgress size={120} />
          <div>문서를 분석중이에요.</div>
        </div>
      )}
    </div>
  );
}
