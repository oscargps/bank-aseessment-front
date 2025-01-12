import config from "../../../../config";
import {
  METHODS,
  RequestService,
} from "../../../core/bussiness/helpers/serviceHelper";
import { StorageHelper } from "../../../core/bussiness/helpers/storageHelper";
import { IProduct } from "../../domain/models/IProduct";
import { CommonDataService } from "./i-data-service";
export class ProductsService implements CommonDataService {
  constructor() {}

  async getData(): Promise<IProduct[]> {
    const savedProducts = StorageHelper.get("Products");
    if (savedProducts) {
      return savedProducts;
    } else {
      const  data  = await RequestService({
        url: `${config.url}/products`,
        headers: {},
        method: METHODS.GET,
      });
      StorageHelper.save("Products", data);
      return data;
    }
  }
}
