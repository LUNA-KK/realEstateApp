import { create } from "zustand";

const useRegionCode = create<{ code: string; setCode: (code: string) => void }>(
  (set) => ({
    code: "",
    setCode: (code: string) => set(() => ({ code })),
  })
);

export default useRegionCode;
