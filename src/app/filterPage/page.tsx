"use client";

import Button from "@/components/Button";
import styles from "./page.module.css";
import Slider from "@mui/material/Slider";
import { useState } from "react";

const type = ["원룸", "빌라", "오피스텔", "아파트", "상가", "기타"];
const transactionType = ["월세", "전세", "매매", "단기매매"];

const FilterArea = ({ title, target }: { title: string; target: string[] }) => {
  const [isSelected, setIsSelected] = useState<string | undefined>();
  const onclick = (type: string) => {
    if (isSelected === type) {
      setIsSelected(undefined);
      return;
    }
    setIsSelected(type);
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles.title}>{title}</div>
      <div className={styles.flex}>
        {target.map((item, idx) => (
          <Button
            key={idx}
            classname={
              isSelected === item ? styles["button--select"] : styles.button
            }
            onClick={() => onclick(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

const priceType = [
  {
    name: "보증금",
    endLabel: "20억원 이상",
  },
  {
    name: "월세",
    endLabel: "500만원 이상",
  },
  {
    name: "매매",
    endLabel: "20억원 이상",
  },
];

const area = [
  {
    name: "면적",
    endLabel: "70평 이상",
  },
];

interface Target {
  name: string;
  endLabel: string;
}

const FilterWithSlider = ({
  title,
  endLabel,
}: {
  title: string;
  endLabel: string;
}) => {
  const mark = [
    {
      value: 0,
      label: "0만원",
    },
    {
      value: 100,
      label: endLabel,
    },
  ];
  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles["slider-wrapper"]}>
        <div style={{ width: "85%" }}>
          <Slider
            className={styles.slider}
            aria-label="Default"
            valueLabelDisplay="auto"
            marks={mark}
            defaultValue={100}
            sx={{
              "& .MuiSlider-rail": {
                backgroundColor: "#d9d9d9",
                boxShadow: "inset 0px 0px 4px -2px #000",
              },
              "& .MuiSlider-mark": {
                display: "none",
              },
              "& .MuiSlider-thumb": {
                backgroundColor: "#fff",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const FilterTargetWithSlider = ({ target }: { target: Target[] }) => {
  return (
    <div className={styles["filter-container"]}>
      {target.map((item) => (
        <FilterWithSlider
          title={item.name}
          endLabel={item.endLabel}
          key={item.name}
        />
      ))}
    </div>
  );
};

export default function FilterPage() {
  return (
    <div className={styles.container}>
      <div />
      <FilterArea title={"매물 종류"} target={type} />
      <div className={styles.divider} />
      <FilterArea title={"거래 방식"} target={transactionType} />
      <div className={styles.divider} />
      <FilterTargetWithSlider target={priceType} />
      <div className={styles.divider} />
      <FilterTargetWithSlider target={area} />
    </div>
  );
}
