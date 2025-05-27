import { create } from "zustand";

interface Props {
  code: string;
  type: number;
  regionName: string;
  cityName: string;
  dvsnName: string;
  setCityName: (name: string) => void;
  setDvsnName: (name: string) => void;
  setRegionName: (name: string) => void;
  setCode: (code: string) => void;
  setType: (type: number) => void;
}
const useRegionCode = create<Props>((set) => ({
  code: "4413133000",
  type: 1,
  regionName: "병천면",
  cityName: "천안시",
  dvsnName: "병천면",
  setCityName: (name: string) => set(() => ({ cityName: name })),
  setDvsnName: (name: string) => set(() => ({ dvsnName: name })),
  setRegionName: (name: string) => set(() => ({ regionName: name })),
  setCode: (code: string) => set(() => ({ code })),
  setType: (type: number) => set(() => ({ type })),
}));

export default useRegionCode;
