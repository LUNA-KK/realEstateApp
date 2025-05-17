"use client";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import styles from "../index.module.css";
import { HouseStore, useHouseStore } from "../../useHouseStore";
import { useSampleHouseList } from "@/app/store/useSampleHouseList";
import { useStep } from "../../useStep";
import { useRouter } from "next/navigation";
import { authFetch } from "@/app/util/authFetch";

interface RecommendCardProps {
  houseid: number;
  type: string;
  transactionType: string;
  price: number;
  area: string;
  floor: string;
  location: string;
  isFavorite?: boolean;
}

const useCreateHouse = () => {
  const [isPending, setIsPending] = useState(false);
  const isError = useRef(false);
  const nextId = useRef(null);

  const createHouse = async (store: HouseStore) => {
    try {
      setIsPending(true);
      const formData = new FormData();
      const jsonData = {
        houseBoardDTO: {
          ptitle: store.houseDetail,
          content: store.houseDetail,
        },
        houseInfoDTO: {
          buildingName: "건물 이름",
          ownerType: store.userType,
          purpose: store.purpose,
          transactionType: store.transactionType,
          price: store.price,
          maintenanceFee: 10,
          address: store.address,
          addressDetail: store.addressDetail,
          exclusiveArea: store.exclusiveArea,
          supplyArea: 100,
          rooms: 3,
          bathrooms: 2,
          floor: 10,
          direction: "남향",
          builtYear: "2015",
          loanAvailable: "가능",
          pet: "가능",
          parking: "가능",
          houseDetail: store.houseDetail,
        },
      };

      formData.append(
        "data",
        new Blob([JSON.stringify(jsonData)], { type: "application/json" })
      );

      if (store.imageFile) {
        console.log("imageFile", store.imageFile);
        formData.append("pimg", store.imageFile);
      }

      for (const key in formData.entries()) {
        console.log(key, formData.get(key));
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/house-board/create`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      nextId.current = data.houseInfoDTO.houseId;
      if (response.status < 200 && response.status >= 400) {
        throw new Error("Failed to create house");
      }
    } catch (error) {
      isError.current = true;
    } finally {
      setIsPending(false);
    }
  };

  return { createHouse, isPending, isError, nextId };
};

export default function HouseDetailForm() {
  const store = useHouseStore();
  const { addSampleHouse, sampleHouseList } = useSampleHouseList();
  const { resetStep } = useStep();
  const router = useRouter();
  const { createHouse, isPending, isError, nextId } = useCreateHouse();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    store.setHouseDetail(value);
  };

  const onsubmit = async () => {
    /*
    const createId = sampleHouseList.length + 1;
    addSampleHouse({
      houseid: createId,
      type: store.purpose,
      transactionType: store.transactionType,
      price: store.price,
      area: String(store.exclusiveArea),
      floor: String(3),
      location: store.address,
      isFavorite: false,
    });
    */
    await createHouse(store);
    if (isError.current) {
      alert("매물 등록에 실패했습니다.");
      return;
    }
    store.resetHouseStore();
    router.replace(`/houseDetail/${nextId.current}`);
    alert("매물을 등록했습니다.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <textarea
          className={styles.textarea}
          value={store.houseDetail}
          onChange={handleChange}
        />
      </div>
      <Button onClick={onsubmit} disabled={store.houseDetail === ""}>
        작성 완료
      </Button>
    </div>
  );
}
