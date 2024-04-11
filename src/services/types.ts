export interface ResposeError {
  message: string;
  status: string | number;
}

//userApi
export interface OtpCodeAuthArg {
  phone: string;
  code: string|number;
}
export interface TokenArg {
  fcmToken: string;
}
export interface IRefreshTokenArg {
  refresh_token: string;
}
export interface IUserUpdate {
  nameFirst: string;
  nameLast?: string;
  namePatronimic?: string;
  sex: string;

  phone: string;
  regionId: string;
}

export interface ITransaction {
  id: string;
  createdAt: string;
  amount: number;
  balance: number;
  creatorId: string;
  region: string;
  address: string;
  sum: number;
  isCharity: boolean;
}
export interface IListTransactions {
  data: ITransaction[];
}
//PurchasesApi
export interface Meta {
  count: number;
  total: number;
  per_page: number;
  page: number;
  pages: number;
}
export interface PurchasesResponse {
  data: unknown[];
  meta: Meta;
}

//ProductsApi
export interface Product {
  barcode: string;
  category: string;
  created_at: string;
  description?: string;
  id: string;
  image: string;
  price: string;
  mobilePrice?: number;
  price_mobile?: number;
  promo_end_at: string;
  promo_price?: number;
  promo_price_type: string;
  promo_start_at: string;
  promo_title: string;
  promo_type: string;
  sku: string;
  status: string;
  title: string;
}
export interface ProductList {
  data: Product[];
}

export type PromoType = "week" | "new" | "best";
export interface ProductArg {
  page: number;
  promoPriceType: PromoType;
  filterInput?: string;
}

export interface ProductBarcodeArg {
  barcode: string;
}

//FaqApi
export interface IFaq {
  id: string;
  question: string;
  answer: string;
  image: string;
  createdAt: string;
}
export interface IFaqList {
  data: IFaq[];
}
//FeedbackApi

export interface IFeedBack {
  name: string;
  phone: string;
  email?: string;
  text: string;
}

//ShopApi
export interface IShopAddress {
  city: string;
  street: string;
  building: string;
  additional_info: string;
  latitude: string;
  longitude: string;
}

export interface IShop {
  id: string;
  title: string;
  phone: string;
  created_at: string;
  city: string;
  address: IShopAddress;
}
export interface IShopList {
  data: IShop[];
}

export interface IShopArg {
  regionId: string;
}

export interface IRegion {
  created_at: string;
  id: string;
  status: string;
  title: string;
}
[];
export interface IShopsMap {
  address: string;
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}
export type TRegion = string;
export type TShop = string;
//ArticleApi

export interface IArticle {
  banner: string;
  createdAt: string;
  description: string;
  id: string;
  messageBody: string;
  messageTitle: string;
  regions: TRegion[];
  shps: TShop[];
  title: string;
}
export interface IArticleResponse {
  data: IArticle[];
  meta: Meta;
}
