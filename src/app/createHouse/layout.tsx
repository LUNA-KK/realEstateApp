"use client";

import TopNavigation from "@/components/UI/TopNavigation/TopNavigation";
import ProgressBar from "./components/progressbar";
import styles from "./layout.module.css";
import { useStep } from "./useStep";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentStep, prevStep, prevTransactionStep, transactionStep } =
    useStep();
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

  return (
    <div className={styles.container}>
      <TopNavigation onclick={handleBackButtonClick} />
      <div className={styles.content}>
        <ProgressBar currentStep={currentStep} />
        {children}
      </div>
    </div>
  );
}
