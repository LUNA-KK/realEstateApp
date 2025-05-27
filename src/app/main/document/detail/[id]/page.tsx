"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

interface DocumentDetail {
  pid: number;
  userid: string;
  owner: string;
  issueDate: string;
  riskLevel: string;
  riskKeywords: string;
  mainWarnings: string;
  maxClaim: number;
  protectedAmount: number;
  pdfBase64: string;
  riskDetails: any;
}

const dangerMock: DocumentDetail = {
  pid: 1,
  userid: "user1",
  owner: "박미정",
  issueDate: "2025-05-28T12:00:00Z",
  riskLevel: "위험",
  riskKeywords: "위험, 주의",
  mainWarnings:
    "집이 법적 압류 상태예요. - 채권자가 소송이나 빚 문제로 이 집에 대해 가압류를 걸어둔 상태예요. 계약 전 주의가 필요해요. / 소유권 변동 가능성이 있어요. - 집주인 또는 전문가와 소유권 변동에 대한 확인이 필요해요. / 매물을 담보로 받은 융자금이 있어요. - 채권최고액과 보증금의 합이 시세의 70% 이하일 때 안전하다고 판단할 수 있어요.",
  maxClaim: 88000000,
  protectedAmount: 30000000,
  pdfBase64: "pdf",
  riskDetails: {
    riskLevel: "위험",
    riskKeywords: "위험, 주의",
    mainWarnings: ["위험 경고"],
    maxClaim: 70000000,
    protectedAmount: 5500,
  },
};

type Status = string;

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

const StatusTitle = ({ code }: { code: Status }) => {
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

const StatusText = ({
  code,
  text,
  sub,
}: {
  code: Status;
  text: string;
  sub?: string;
}) => {
  let icon;
  if (code === "safe") icon = <SafeIcon />;
  else if (code === "warning") icon = <WarningIcon />;
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

const response = {
  keywordCount: 2,
  keyword: ["가압류", "가처분"],
  keywordExplain:
    "해당 키워드와 같은 과거 기록이 있다면, 매물이 경매에 넘어가 보증금이 위험해질 수도 있어요.",
  price: 10000000,
  amount: 5000000,
  owner: "홍길동",
};

export default function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [documentDetail, setDocumentDetail] = useState<DocumentDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isOpenMockPdf, setIsOpenMockPdf] = useState(false);

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
        const data: DocumentDetail = await response.json();
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

  if (isLoading) {
    return null;
  }

  if (isOpenMockPdf) {
    return (
      <div className={styles.container}>
        <iframe
          src={`data:application/pdf;base64,${dangerMock.pdfBase64}`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
        <Button onClick={() => setIsOpenMockPdf(false)}>닫기</Button>
      </div>
    );
  }

  if (id === "mock") {
    const data = dangerMock;

    let mockriskKeywords;
    let mockriskKeywordCount;
    let mockexplainTextObj;

    mockriskKeywords = data.riskKeywords
      .split(",")
      .map((keyword) => keyword.trim());
    mockriskKeywordCount = mockriskKeywords.length;

    mockexplainTextObj = data.mainWarnings.split("/").map((text) => {
      const splitText = text.split("-");

      return {
        text: splitText[0].trim(),
        sub: splitText[1].trim(),
      };
    });

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
          <StatusTitle code={data.riskLevel} />
          <div>
            등기부등본 발급일자 :{" "}
            {new Date(data.issueDate).toLocaleString("ko-KR")}
          </div>
          {mockexplainTextObj && (
            <div className={styles.explain}>
              {mockexplainTextObj &&
                mockexplainTextObj.map((item, index) => (
                  <StatusText
                    text={item.text}
                    code={"danger"}
                    key={index}
                    sub={item.sub}
                  />
                ))}
            </div>
          )}
          <div className={styles.divider} />

          <div className={styles.content}>
            <div className={styles.result}>
              <span>위험 키워드</span>
              <span>
                {mockriskKeywordCount === 0 || !mockriskKeywordCount
                  ? "없음"
                  : `${mockriskKeywordCount}개`}
              </span>
            </div>
            {mockriskKeywords && mockriskKeywords.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {mockriskKeywords.map((item, index) => (
                    <span key={index} className={styles.keyword}>
                      {item}
                    </span>
                  ))}
                </div>
                <div>{response.keywordExplain}</div>
              </>
            )}
            <div className={styles.result}>
              <span>채권최고액</span>
              <span>{data.maxClaim.toLocaleString()}원</span>
            </div>
            <div className={styles.result}>
              <span>보호받을 수 있는 보증금</span>
              <span>최대 {data.protectedAmount.toLocaleString()}원</span>
            </div>
            <div className={styles.result}>
              <span>소유주</span>
              <span>{data.owner}</span>
            </div>
          </div>
          <button
            className={styles.button}
            onClick={() => setIsOpenMockPdf(true)}
          >
            등기부등본 원본 보기
          </button>
          <div className={styles.footer}>
            본 부동산에 관한 정확한 등기부등본의 내용은 대한민국 법원 인터넷
            등기소 사이트(https://www.iros.go.kr/index.jsp) 등을 통해 확인하실
            수 있습니다. 본 서비스에서 제공하는 분석 결과는 참고용으로 제공되며,
            그 내용과 사실이 다르거나 변경될 사항이 있을 수 있습니다. 본 부동산
            권리분석 결과의 활용에 대한 책임은 이용자 본인에게 있습니다. 해당
            서비스는 공인중개법상 공인중개사에 해당하지 않으며, 제공하는 모든
            정보 및 서비스는 공인중개사법 상 의무와 무관합니다.
          </div>
        </div>
      </div>
    );
  }

  if (!documentDetail) {
    return <div className={styles.error}>문서 정보를 불러오지 못했어요.</div>;
  }

  if (isPdfOpen) {
    return (
      <div className={styles.container}>
        <iframe
          src={`data:application/pdf;base64,${documentDetail.pdfBase64}`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
        <Button onClick={() => setIsPdfOpen(false)}>닫기</Button>
      </div>
    );
  }

  const code =
    documentDetail.riskLevel === "안전"
      ? "safe"
      : documentDetail.riskLevel === "주의"
      ? "warning"
      : "danger";

  let riskKeywords;
  let riskKeywordCount;
  let explainTextObj;
  if (code !== "safe") {
    riskKeywords = documentDetail.riskKeywords
      .split(",")
      .map((keyword) => keyword.trim());
    riskKeywordCount = riskKeywords.length;
    console.log("riskKeywords", riskKeywords);
    console.log("riskKeywordCount", riskKeywordCount);

    explainTextObj = documentDetail.mainWarnings.split("/").map((text) => {
      const splitText = text.split("-");

      return {
        text: splitText[0].trim(),
        sub: splitText[1].trim(),
      };
    });
  }

  const safeExplainTextObj = [
    {
      text: "소유권 관련 특이사항이 없어요.",
    },
    {
      text: "집주인이 매물을 담보로 받은 융자금이 없어요.",
    },
    {
      text: "가압류, 가처분, 경매 등 채권 관련 특이사항이 없어요.",
    },
  ];

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
        <StatusTitle code={documentDetail.riskLevel} />
        <div>
          등기부등본 발급일자 :{" "}
          {new Date(documentDetail.issueDate).toLocaleString("ko-KR")}
        </div>
        {explainTextObj ? (
          <div className={styles.explain}>
            {explainTextObj &&
              explainTextObj.map((item, index) => (
                <StatusText
                  text={item.text}
                  code={code}
                  key={index}
                  sub={item.sub}
                />
              ))}
          </div>
        ) : (
          <div className={styles.explain}>
            {safeExplainTextObj.map((item, index) => (
              <StatusText text={item.text} code={code} key={index} />
            ))}
          </div>
        )}
        <div className={styles.divider} />

        <div className={styles.content}>
          <div className={styles.result}>
            <span>위험 키워드</span>
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
          <div className={styles.result}>
            <span>채권최고액</span>
            <span>{documentDetail.maxClaim.toLocaleString()}원</span>
          </div>
          <div className={styles.result}>
            <span>보호받을 수 있는 보증금</span>
            <span>
              최대 {documentDetail.protectedAmount.toLocaleString()}원
            </span>
          </div>
          <div className={styles.result}>
            <span>소유주</span>
            <span>{documentDetail.owner}</span>
          </div>
        </div>
        <button className={styles.button} onClick={() => setIsPdfOpen(true)}>
          등기부등본 원본 보기
        </button>
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
