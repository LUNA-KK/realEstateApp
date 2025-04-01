import { create } from "zustand";

interface StepStore {
  currentStep: number;
  totalStep: number;
  transactionStep: number;
  nextTransactionStep: () => void;
  prevTransactionStep: () => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

export const useStep = create<StepStore>()((set) => ({
  currentStep: 1,
  totalStep: 7,
  transactionStep: 1,
  setCurrentStep: (step: number) => set(() => ({ currentStep: step })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  nextTransactionStep: () =>
    set((state) => ({ transactionStep: state.transactionStep + 1 })),
  prevTransactionStep: () =>
    set((state) => ({ transactionStep: state.transactionStep - 1 })),
  resetStep: () => set(() => ({ currentStep: 1 })),
}));
