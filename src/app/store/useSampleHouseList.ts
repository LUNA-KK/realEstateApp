import { create } from "zustand";

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

const mockdata = [
  {
    houseid: 1,
    type: "아파트",
    transactionType: "매매",
    price: 4500,
    area: "5.49㎡",
    floor: "29층",
    location: "개포동",
    isFavorite: true,
  },
  {
    houseid: 2,
    type: "오피스텔",
    transactionType: "월세",
    price: 3000,
    area: "10.23㎡",
    floor: "10층",
    location: "서초동",
    isFavorite: false,
  },
  {
    houseid: 3,
    type: "오피스텔",
    transactionType: "월세",
    price: 3000,
    area: "10.23㎡",
    floor: "10층",
    location: "서초동",
    isFavorite: false,
  },
];

interface SampleHouseListStore {
  sampleHouseList: RecommendCardProps[];
  addSampleHouse: (newHouse: RecommendCardProps) => void;
}

export const useSampleHouseList = create<SampleHouseListStore>()((set) => ({
  sampleHouseList: mockdata,
  addSampleHouse: (newHouse) =>
    set((state) => ({
      sampleHouseList: [...state.sampleHouseList, newHouse],
    })),
}));
