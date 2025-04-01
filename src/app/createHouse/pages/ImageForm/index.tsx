import Button from "@/components/Button";
import styles from "../index.module.css";
import { useStep } from "../../useStep";
import { useRef, useState } from "react";

export default function ImageForm() {
  const { nextStep } = useStep();
  const ref = useRef<HTMLInputElement>(null);
  const openFile = () => {
    ref.current?.click();
  };
  const [url, setUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result;
      setUrl(imageUrl as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        매물 사진
        <button className={styles.button} onClick={openFile}>
          사진 추가
        </button>
        <input
          className={styles.file}
          type="file"
          ref={ref}
          accept="image/*"
          onChange={handleChange}
        />
        {url && (
          <img
            src={url}
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
          />
        )}
      </div>
      <Button onClick={nextStep}>다음</Button>
    </div>
  );
}
