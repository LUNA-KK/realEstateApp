import styles from "./progressbar.module.css";

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  const steps = [
    "작성자를 알려주세요.",
    "매물 종류를 선택해주세요.",
    "주소를 입력해주세요.",
    "거래 유형을 선택해주세요.",
    "매물 사진을 등록해주세요.",
    "매물 소개를 입력해주세요.",
    "매물에 대한 정보를 입력해주세요.",
  ];

  return (
    <div className={styles.container}>
      {steps[currentStep - 1]}
      <div className={styles["progress-container"]}>
        <div
          className={styles["progress-bar"]}
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
