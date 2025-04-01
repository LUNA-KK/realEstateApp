import Button from "@/components/Button";
import styles from "../index.module.css";
import { useStep } from "../../useStep";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useHouseStore } from "../../useHouseStore";
import { useState } from "react";

export default function AddressForm() {
  const { nextStep } = useStep();
  const { address, setAddress } = useHouseStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: { address: string }) => {
    setAddress(data.address);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isOpen ? (
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            style={{ height: "calc(100% - 20px)" }}
          />
        ) : (
          <div className={styles["input-wrapper"]}>
            <input
              value={address}
              className={styles.input}
              placeholder="예) 한기대로 411, 병천면 192"
              readOnly
            />
            <button
              className={styles["search-button"]}
              onClick={() => setIsOpen(true)}
            >
              <img src="/search.png" />
            </button>
          </div>
        )}
      </div>
      <div className={styles["button-wrapper"]}>
        <Button onClick={nextStep} disabled={address === ""}>
          다음
        </Button>
      </div>
    </div>
  );
}
