"use client";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

const newMock = {
  id: 33,
  pid: 42756,
  userid: "test03",
  ragAnswer:
    "0. 최종 소유주는 지상식과 이갑연입니다. 두 사람이 각각 2분의 1의 지분을 가지고 있습니다.\n\n1. 사용자의 등기부등본에서 등장하는 용어는 근저당권, 소유권이전등기, 소유권보존등기입니다.\n\n2. 소유권 및 권리 우선순위에 주의할 점은 소유권이 지상식과 이갑연 두 사람에게 공동으로 있으며, 근저당권이 설정되어 있었지만 현재는 말소된 상태입니다. 이는 해당 부동산에 대한 금융기관의 담보권이 없다는 것을 의미합니다.\n\n3. 주택 소재지는 경상남도 진주시 충무공동입니다. 따라서 소액임차인 보호 한도(보증금 보호 가능 금액)는 75000000원입니다.\n\n4. 실거주 목적 구매자 관점에서 주의할 점은 소유권이 두 사람에게 공동으로 있으므로, 매매 계약 시 두 사람 모두의 동의가 필요하다는 점입니다.\n\n5. 계약서에 넣으면 좋을 특약 조항으로는 소유권 이전 시 두 소유주 모두의 서명이 필요하다는 점을 명시하는 것이 좋을 것 같습니다.\n\n6. 등기부등본에서 등장하는 법률 용어 중 '근저당권'은 부동산을 담보로 제공하여 대출을 받을 때 설정하는 권리를 의미하며, '소유권이전등기'는 소유권을 다른 사람에게 넘기는 것을 의미합니다. '소유권보존등기'는 소유권을 보호하기 위해 설정하는 등기를 의미합니다.\n\n7. 현재 사용자의 등기부등본의 전체적인 위험도는 '안전'으로 판단됩니다. 근저당권이 말소되어 있고, 소유권이 명확하게 두 사람에게 있으며, 소유권보존등기가 있어 소유권이 보호되고 있기 때문입니다.",
  purpose: "원룸",
  transactionType: "월세",
  price: 100000.0,
  rentPrc: 40.0,
  exclusiveArea: 18.45,
  pdfBase64: "아주 긴 pdf값",
  riskDetails: null,
};

interface NewDetail {
  id: number;
  pid: number;
  userid: string;
  ragAnswer: string;
  purpose: string;
  transactionType: string;
  price: number;
  rentPrc: number;
  exclusiveArea: number;
  pdfBase64: string;
  riskDetails: any;
}

const response = {
  keywordCount: 2,
  keyword: ["가압류", "가처분"],
  keywordExplain:
    "해당 키워드와 같은 과거 기록이 있다면, 매물이 경매에 넘어가 보증금이 위험해질 수도 있어요.",
  price: 10000000,
  amount: 5000000,
  owner: "홍길동",
};

const StatusTitle = ({ code }: { code: string }) => {
  if (code === "위험") {
    return (
      <div className={styles.status}>
        분석 결과 <span className={styles.danger}>위험</span> 요소가 발견된
        매물이에요.
      </div>
    );
  }
  if (code === "주의") {
    return (
      <div className={styles.status}>
        분석 결과 <span className={styles.warning}>주의</span> 요소가 발견된
        매물이에요.
      </div>
    );
  }
  return (
    <div className={styles.status}>
      분석 결과 <span className={styles.safe}>안전</span>한 매물이에요.
    </div>
  );
};

const DangerIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill="#FF0000" />
    </svg>
  );
};

const WarningIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill="#FFA500" />
    </svg>
  );
};

const SafeIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill="#00FF00" />
    </svg>
  );
};

const StatusText = ({
  code,
  text,
  sub,
}: {
  code: string;
  text: string;
  sub?: string;
}) => {
  let icon;
  if (code === "안전") icon = <SafeIcon />;
  else if (code === "주의") icon = <WarningIcon />;
  else icon = <DangerIcon />;

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        flexDirection: "column",
      }}
    >
      <div>
        <span style={{ marginRight: "10px" }}>{icon}</span>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {text}
        </span>
      </div>
      <div>{sub}</div>
    </div>
  );
};

const checkTitle = [
  "✅ 소유권 및 권리 우선순위에 주의할 점",
  "✅ 실거주 목적이라면?",
  "✅ 계약서 작성 시 특약조항 추천",
  "✅ 쉽게 알아보는 법률 용어",
];

export default function AnalyzeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [documentDetail, setDocumentDetail] = useState<NewDetail>();
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDocumentDetail = async (id: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/document/analyze/detail/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch document details");
        }
        const data: NewDetail = await response.json();
        setDocumentDetail(data);
      } catch (error) {
        console.error("Error fetching document details:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    };
    getDocumentDetail(id);
  }, []);

  if (!documentDetail) return null;

  const ragAnswer = documentDetail?.ragAnswer;
  const lines = ragAnswer?.split("\n").filter((line) => line.trim() !== "")!;
  const ownerMatch = ragAnswer?.match(/최종 소유주는 (.+?)입니다/);
  const owner = ownerMatch ? ownerMatch[1] : "";

  const code = ["안전", "주의", "위험"].find((keyword) =>
    lines[7].includes(keyword)
  );

  const keywords = [
    "근저당권",
    "가압류",
    "가등기",
    "가처분",
    "전세권설정",
    "임차권등기명령",
    "소유권이전등기",
    "공동담보설정",
    "소유권보존등기",
    "경매개시결정",
    "신탁",
  ];

  const secondLine = lines[1] || "";
  const riskKeywords = keywords.filter((word) => secondLine.includes(word));
  const riskKeywordCount = riskKeywords.length;

  const fourthLine = lines[3] || "";
  const amountMatch = fourthLine.match(/([0-9,]+)원/);
  const amount = amountMatch ? amountMatch[1].replace(/,/g, "") : "";

  const explainTextObj = { text: lines[2].slice(2).trim() };
  const checkTextList = [lines[2], lines[4], lines[5], lines[6]].map((text) =>
    text.slice(2).trim()
  );

  if (isPdfOpen) {
    return (
      <div className={styles.container}>
        <iframe
          src={`data:application/pdf;base64,${documentDetail?.pdfBase64}`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
        <Button onClick={() => setIsPdfOpen(false)}>닫기</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>문서 분석</div>
        <button
          className={styles.close}
          onClick={() => router.push("/main/document")}
        >
          <svg
            width="33"
            height="24"
            viewBox="0 0 33 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5101 3.8701L24.7301 2.1001L14.8401 12.0001L24.7401 21.9001L26.5101 20.1301L18.3801 12.0001L26.5101 3.8701Z"
              fill="black"
            />
            <path
              d="M6.48991 3.8701L8.26991 2.1001L18.1599 12.0001L8.25991 21.9001L6.48991 20.1301L14.6199 12.0001L6.48991 3.8701Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div className={styles.content}>
        <StatusTitle code={code || ""} />
        <div>등기부등본 발급일자 : {new Date().toLocaleString("ko-KR")}</div>
        {explainTextObj && (
          <div className={styles.explain}>
            {explainTextObj && (
              <StatusText text={explainTextObj.text} code={code || ""} />
            )}
          </div>
        )}
        <div className={styles.divider} />

        <div className={styles.content}>
          <div className={styles.result}>
            <span>키워드 요약</span>
            <span>
              {riskKeywordCount === 0 || !riskKeywordCount
                ? "없음"
                : `${riskKeywordCount}개`}
            </span>
          </div>
          {riskKeywords && riskKeywords.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {riskKeywords.map((item, index) => (
                  <span key={index} className={styles.keyword}>
                    {item}
                  </span>
                ))}
              </div>
              <div>{response.keywordExplain}</div>
            </>
          )}
          {/*
          <div className={styles.result}>
            <span>채권최고액</span>
            <span>{documentDetail.maxClaim.toLocaleString()}원</span>
          </div>
          */}
          <div className={styles.result}>
            <span>보호받을 수 있는 보증금</span>
            <span>최대 {Number(amount).toLocaleString()}원</span>
          </div>
          <div className={styles.result}>
            <span>소유주</span>
            <span>{owner}</span>
          </div>
        </div>
        <button className={styles.button} onClick={() => setIsPdfOpen(true)}>
          등기부등본 원본 보기
        </button>
        <div>
          <div
            className={styles["checkItem-title"]}
            style={{ marginBottom: "20px" }}
          >
            계약 전, 꼭 확인해보세요!
          </div>
          <div className={styles.checkList}>
            {checkTextList.map((text, index) => (
              <div key={index} className={styles.checkItem}>
                <div className={styles["checkItem-title"]}>
                  {checkTitle[index]}
                </div>
                <div>{text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          본 부동산에 관한 정확한 등기부등본의 내용은 대한민국 법원 인터넷
          등기소 사이트(https://www.iros.go.kr/index.jsp) 등을 통해 확인하실 수
          있습니다. 본 서비스에서 제공하는 분석 결과는 참고용으로 제공되며, 그
          내용과 사실이 다르거나 변경될 사항이 있을 수 있습니다. 본 부동산
          권리분석 결과의 활용에 대한 책임은 이용자 본인에게 있습니다. 해당
          서비스는 공인중개법상 공인중개사에 해당하지 않으며, 제공하는 모든 정보
          및 서비스는 공인중개사법 상 의무와 무관합니다.
        </div>
      </div>
    </div>
  );
}
