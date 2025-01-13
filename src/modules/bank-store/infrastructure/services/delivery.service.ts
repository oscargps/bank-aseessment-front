import config from "../../../../config";
import {
  METHODS,
  RequestService,
} from "../../../core/bussiness/helpers/serviceHelper";
import { ICreateDelivery, IDeliveryResponse } from "../../domain/models/IDelivery";

export class DeliveryService {
  constructor() { }

  async createDelivery(delivery: ICreateDelivery): Promise<IDeliveryResponse> {
    try {
      const data = await RequestService({
        url: `${config.url}/deliveries`,
        headers: {},
        method: METHODS.POST,
        body: delivery
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getDeliveryStatus(reference: ICreateDelivery['reference']): Promise<IDeliveryResponse> {
    try {
      const data = await RequestService({
        url: `${config.url}/deliveries/${reference}`,
        headers: {},
        method: METHODS.GET,
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
