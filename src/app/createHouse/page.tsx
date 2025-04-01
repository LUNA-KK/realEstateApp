"use client";
import Button from "@/components/Button";
import { useStep } from "./useStep";
import UserTypeForm from "./pages/UserTypeForm";
import PurposeForm from "./pages/PurposeForm";
import styles from "./page.module.css";
import TransactionTypeForm from "./pages/TransactionTypeForm";
import AddressForm from "./pages/AdressForm";
import ImageForm from "./pages/ImageForm";
import AreaForm from "./pages/AreaForm";
import HouseDetailForm from "./pages/HouseDetailForm";

const sample = {
  houseBoardDTO: {
    ptitle: "제목 테스트1",
    content: "내용 테스트1",
    pimg: "test1.jpg",
    views: 0,
  },
  houseInfoDTO: {
    buildingName: "빌딩 이름 테스트1",
    purpose: "주거용",
    transactionType: "매매",
    price: 25000000,
    maintenanceFee: 300000,
    address: "주소 테스트1",
    addressDetail: "111동 111호",
    exclusiveArea: 85.5,
    supplyArea: 110.2,
    rooms: 3,
    bathrooms: 2,
    floor: 10,
    direction: "남향",
    builtYear: "2015",
    loanAvailable: "가능",
    pet: "가능",
    parking: "가능",
    houseDetail: "상세 테스트1",
  },
};

const MultiStepForm = [
  <UserTypeForm />,
  <PurposeForm />,
  <AddressForm />,
  <TransactionTypeForm />,
  <ImageForm />,
  <AreaForm />,
  <HouseDetailForm />,
];

export default function CreateHouse() {
  const { currentStep } = useStep();

  return (
    <div className={styles.container}>{MultiStepForm[currentStep - 1]}</div>
  );
}
