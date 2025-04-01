"use client";

import TopNavigation from "@/components/UI/TopNavigation/TopNavigation";
import ProgressBar from "./components/progressbar";
import styles from "./layout.module.css";
import { useStep } from "./useStep";
import { useRouter } from "next/navigation";
import { useHouseStore } from "./useHouseStore";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    currentStep,
    prevStep,
    prevTransactionStep,
    transactionStep,
    resetStep,
  } = useStep();
  const { resetHouseStore } = useHouseStore();
  const router = useRouter();

  const handleBackButtonClick = () => {
    if (currentStep === 4 && transactionStep === 2) {
      prevTransactionStep();
      return;
    }
    if (currentStep > 1) {
      prevStep();
      return;
    }
    router.back();
  };

  useEffect(() => {
    return () => {
      resetHouseStore();
      resetStep();
    };
  }, []);

  return (
    <div className={styles.container}>
      <TopNavigation onclick={handleBackButtonClick} />
      <div className={styles.content}>
        <div className={styles.space} />
        <ProgressBar currentStep={currentStep} />
        {children}
      </div>
    </div>
  );
}
