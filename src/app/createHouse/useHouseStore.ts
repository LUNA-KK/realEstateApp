import { create } from "zustand";

/**
 * 작성자: userType
 * 매물 종류: purpose
 * 주소: address
 * 거래 유형: transactionType
 * 거래 유형 - 금액: price
 * 매물 사진
 * 전용면적: exclusiveArea
 * 매물 소개: houseDetail
 *  */

interface HouseStore {
  transactionType: string;
  price: number;
  houseDetail: string;
  address: string;
  exclusiveArea: number;
  purpose: string;
  userType: string;
  setTransactionType: (value: string) => void;
  setPrice: (value: number) => void;
  setHouseDetail: (value: string) => void;
  setAddress: (value: string) => void;
  setExclusiveArea: (value: number) => void;
  setPurpose: (value: string) => void;
  setUserType: (value: string) => void;
  resetHouseStore: () => void;
}

export const useHouseStore = create<HouseStore>()((set) => ({
  transactionType: "",
  price: 0,
  houseDetail: "",
  address: "",
  exclusiveArea: 0,
  purpose: "",
  userType: "",
  setTransactionType: (value: string) =>
    set(() => ({ transactionType: value })),
  setPrice: (value: number) => set(() => ({ price: value })),
  setHouseDetail: (value: string) => set(() => ({ houseDetail: value })),
  setAddress: (value: string) => set(() => ({ address: value })),
  setExclusiveArea: (value: number) => set(() => ({ exclusiveArea: value })),
  setPurpose: (value: string) => set(() => ({ purpose: value })),
  setUserType: (value: string) => set(() => ({ userType: value })),
  resetHouseStore: () =>
    set(() => ({
      transactionType: "",
      price: 0,
      houseDetail: "",
      address: "",
      exclusiveArea: 0,
      purpose: "",
      userType: "",
    })),
}));
