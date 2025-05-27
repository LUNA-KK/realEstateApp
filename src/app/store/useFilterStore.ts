import { create } from "zustand";

interface Props {
  maxPrice: number;
  minPrice: number;
  maxRentPrce: number;
  minRentPrice: number;
  transactionType: string;
  purpose: string;
  maxExclusiveArea: number;
  setMaxPrice: (price: number) => void;
  setMinPrice: (price: number) => void;
  setMaxRentPrice: (price: number) => void;
  setMinRentPrice: (price: number) => void;
  setTransactionType: (type: string) => void;
  setPurpose: (purpose: string) => void;
  setMaxExclusiveArea: (area: number) => void;
  resetFilter: () => void;
}

const useFileterStore = create<Props>((set) => ({
  maxPrice: 2000,
  minPrice: 0,
  maxRentPrce: 500,
  minRentPrice: 0,
  transactionType: "",
  purpose: "",
  maxExclusiveArea: 100,
  setMaxPrice: (price) => set({ maxPrice: price }),
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxRentPrice: (price) => set({ maxRentPrce: price }),
  setMinRentPrice: (price) => set({ minRentPrice: price }),
  setTransactionType: (type) => set({ transactionType: type }),
  setPurpose: (purpose) => set({ purpose }),
  setMaxExclusiveArea: (area) => set({ maxExclusiveArea: area }),
  resetFilter: () =>
    set({
      maxPrice: 2000,
      minPrice: 0,
      maxRentPrce: 500,
      minRentPrice: 0,
      transactionType: "",
      purpose: "",
      maxExclusiveArea: 100,
    }),
}));

export default useFileterStore;
