export interface HouseBoardDTO {
  ptitle: string;
  content: string;
  pimg: string;
  views: number;
}

export interface HouseInfoDTO {
  buildingName: string;
  purpose: string;
  transactionType: string;
  price: number;
  maintenanceFee: number;
  address: string;
  addressDetail: string;
  exclusiveArea: number;
  supplyArea: number;
  rooms: number;
  bathrooms: number;
  floor: number;
  direction: string;
  builtYear: string;
  loanAvailable: string;
  pet: string;
  parking: string;
  houseDetail: string;
}

export interface HouseRequest {
  houseBoardDTO: HouseBoardDTO;
  houseInfoDTO: HouseInfoDTO;
}
