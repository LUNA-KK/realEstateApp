"use client";

import Button from "@/components/Button";
import styles from "./page.module.css";
import Slider from "@mui/material/Slider";
import { useEffect, useState, useTransition } from "react";
import { authFetch } from "../util/authFetch";
import { create } from "zustand";
import useRegionCode from "../store/useRegionCode";
import useFileterStore from "../store/useFilterStore";

interface RegionProps {
  title: string;
}

interface AddressResposne {
  cortar_no: string;
  center_lat: number;
  center_lon: number;
  cortar_name: string;
  cortar_type: string;
}

type Response = AddressResposne[];

const RegionItem = ({
  code,
  name,
  onClick,
  isClicked = false,
}: {
  code: string;
  name: string;
  onClick: (code: string) => void;
  isClicked?: boolean;
}) => {
  const handleClick = () => {
    onClick(code);
  };

  return (
    <div
      className={styles["region-item"]}
      onClick={handleClick}
      style={{
        backgroundColor: isClicked ? "#b0e4ff" : "transparent",
      }}
    >
      {name}
    </div>
  );
};

const getNextCode = async (code: string) => {
  const resposne = await authFetch({
    url: `/api/house-board/getNextAddr/?code=${code}`,
  });
  if (!resposne.ok) {
    throw new Error("Failed to fetch next code");
  }
  const data: Response = await resposne.json();
  return data;
};

interface SelectRegion {
  selected: {
    city: string;
    dvsn: string;
    sect: string;
  };
  setSelected: (key: string, selected: string) => void;
}
const useSelectRegion = create<SelectRegion>((set) => ({
  selected: {
    city: "0000000000",
    dvsn: "",
    sect: "",
  },
  setSelected: (key: string, selected: string) =>
    set((state) => ({
      selected: {
        ...state.selected,
        [key]: selected,
      },
    })),
}));

interface RegionStore {
  cityList: Response;
  dvsnList: Response;
  sectList: Response;
  setCityList: (list: Response) => void;
  setDvsnList: (list: Response) => void;
  setSectList: (list: Response) => void;
}

const useRegionStore = create<RegionStore>((set) => ({
  cityList: [],
  dvsnList: [],
  sectList: [],
  setCityList: (list: Response) => set({ cityList: list }),
  setDvsnList: (list: Response) => set({ dvsnList: list }),
  setSectList: (list: Response) => set({ sectList: list }),
}));

const FilterRegion = ({ title }: RegionProps) => {
  const {
    cityList,
    setCityList,
    dvsnList,
    setDvsnList,
    sectList,
    setSectList,
  } = useRegionStore();
  const { setCode, setRegionName } = useRegionCode();
  const { selected, setSelected } = useSelectRegion();

  const cityClick = async (code: string) => {
    const nextList = await getNextCode(code);
    setSelected("city", code);
    setDvsnList(nextList);
    setSectList([]);
  };

  const dvsnClick = async (code: string) => {
    const nextList = await getNextCode(code);
    setSelected("dvsn", code);
    setSectList(nextList);
  };

  const sectClick = async (code: string) => {
    setSelected("sect", code);
    setCode(code);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityResponse = await getNextCode("0000000000");
        setCityList(cityResponse);
      } catch (error) {
        console.error("Error fetching region data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles["filter-container"]}>
      <div className={styles.title}>{title}</div>
      <div className={styles["region-box"]}>
        <div className={styles["region-container"]}>
          {cityList.map((item) => (
            <RegionItem
              name={item.cortar_name}
              code={item.cortar_no}
              onClick={cityClick}
              isClicked={selected.city === item.cortar_no}
            />
          ))}
        </div>
        <div className={styles["region-container"]}>
          {dvsnList.map((item) => (
            <RegionItem
              name={item.cortar_name}
              code={item.cortar_no}
              onClick={dvsnClick}
              isClicked={selected.dvsn === item.cortar_no}
            />
          ))}
        </div>
        <div className={styles["region-container"]}>
          {sectList.map((item) => (
            <RegionItem
              name={item.cortar_name}
              code={item.cortar_no}
              onClick={(code) => {
                setRegionName(item.cortar_name);
                sectClick(code);
              }}
              isClicked={selected.sect === item.cortar_no}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const type = ["원룸", "빌라", "오피스텔", "아파트", "상가", "기타"];
const transactionType = ["월세", "전세", "매매"];

const FilterArea = ({
  title,
  target,
  isTrans = false,
  isPurpose = false,
}: {
  title: string;
  target: string[];
  isTrans?: boolean;
  isPurpose?: boolean;
}) => {
  const { setPurpose, setTransactionType, purpose, transactionType } =
    useFileterStore();
  const [isSelected, setIsSelected] = useState<string | undefined>(
    isPurpose ? purpose : transactionType
  );
  const { setType } = useRegionCode();

  const onclick = (type: string) => {
    if (isTrans) {
      const number = type === "매매" ? 1 : type === "전세" ? 2 : 3;
      setType(number);
      setTransactionType(type);

      if (isSelected === type) {
        setIsSelected(undefined);
        setTransactionType("");
        return;
      }
    }

    if (isPurpose) {
      setPurpose(type);
      if (isSelected === type) {
        setIsSelected(undefined);
        setPurpose("");
        return;
      }
    }

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
    key: "",
  },
  {
    name: "월세",
    endLabel: "500만원 이상",
    key: "maxRentPrc",
  },
  {
    name: "매매",
    endLabel: "20억원 이상",
    key: "maxPrice",
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
  key?: string;
}

const FilterWithSlider = ({
  title,
  endLabel,
  type = "",
}: {
  title: string;
  endLabel: string;
  type?: string;
}) => {
  const { setMaxPrice, setMaxRentPrice, maxPrice, maxRentPrce } =
    useFileterStore();

  console.log("maxPrice", maxPrice);
  console.log("maxRentPrce", maxRentPrce);
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

  const handleChange = (e: Event, value: any) => {
    if (type === "maxRentPrc") {
      // Handle max rent price change

      setMaxRentPrice((500 * value) / 100);
    } else if (type === "maxPrice") {
      // Handle max price change

      setMaxPrice((2000 * value) / 100);
    }
  };
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
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const FilterTargetWithSliderPrice = ({ target }: { target: Target[] }) => {
  return (
    <div className={styles["filter-container"]}>
      {target.map((item) => (
        <FilterWithSlider
          title={item.name}
          endLabel={item.endLabel}
          key={item.key}
          type={item.key}
        />
      ))}
    </div>
  );
};

interface Target2 {
  name: string;
  endLabel: string;
}
const FilterTargetWithSlider = ({ target }: { target: Target2[] }) => {
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
      <FilterRegion title={"지역"} />
      <div className={styles.divider} />
      <FilterArea title={"거래 방식"} target={transactionType} isTrans />
      <div className={styles.divider} />
      <FilterArea title={"매물 종류"} target={type} isPurpose />
      <div className={styles.divider} />
      <FilterTargetWithSliderPrice target={priceType} />
      <div className={styles.divider} />
      <FilterTargetWithSlider target={area} />
    </div>
  );
}
