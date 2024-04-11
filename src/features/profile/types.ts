import { IShop, IShopAddress } from "@src/services/types";

export interface IUserForm {
  label: string;
  info: string | string[] | IShop[];
  type?: SelectType;
}
export interface IUserFormEdit extends IUserForm {
  typeForm: "input" | "press";
}
export interface ISex {
  female: string;
  male: string;
}
export type TSex = "female" | "male";
export type SelectType = "regionId" | "shops" | "sex" | "nameFirst" | undefined;
