"use client";

import { create } from "zustand";
import { HouseRequest } from "./type";

export const useHouseRequestStore = create<HouseRequest>((set) => ({
  houseBoardDTO: {
    ptitle: "",
    content: "",
    pimg: "",
    views: 0,
  },
  houseInfoDTO: {
    buildingName: "",
    purpose: "",
    transactionType: "",
    price: 0,
    maintenanceFee: 0,
    address: "",
    addressDetail: "",
    exclusiveArea: 0,
    supplyArea: 0,
    rooms: 0,
    bathrooms: 0,
    floor: 0,
    direction: "",
    builtYear: "",
    loanAvailable: "",
    pet: "",
    parking: "",
    houseDetail: "",
  },
}));
// Compare this snippet from src/app/store/houseRequetStore.ts:
