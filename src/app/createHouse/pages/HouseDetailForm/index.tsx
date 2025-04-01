import Button from "@/components/Button";
import styles from "../index.module.css";
import { useHouseStore } from "../../useHouseStore";
import { useSampleHouseList } from "@/app/store/useSampleHouseList";
import { useStep } from "../../useStep";
import { useRouter } from "next/navigation";

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

export default function HouseDetailForm() {
  const store = useHouseStore();
  const { addSampleHouse, sampleHouseList } = useSampleHouseList();
  const { resetStep } = useStep();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    store.setHouseDetail(value);
  };

  const onsubmit = () => {
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
    router.replace(`/houseDetail/${createId}`);
    store.resetHouseStore();
    resetStep();
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
