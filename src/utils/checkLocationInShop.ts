import { setIsLocationInShop } from "@src/store/slices/userSlice";
import { useAppDispatch } from "@src/store/store";
import GetLocation from "react-native-get-location";
import { checkLocation } from "./checkLocation";
import { shopApi } from "@src/services/shopApi";
import { IShopsMap } from "@src/services/types";
 