import { create } from "zustand";

interface Props {
  code: string;
  type: number;
  setCode: (code: string) => void;
  setType: (type: number) => void;
}
const useRegionCode = create<Props>((set) => ({
  code: "4413133000",
  type: 1,
  setCode: (code: string) => set(() => ({ code })),
  setType: (type: number) => set(() => ({ type })),
}));

export default useRegionCode;
