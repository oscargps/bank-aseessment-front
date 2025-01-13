import { DeliveryUseCase } from "../../bussiness/usecases/delivery.usecase";
import { ICreateDelivery } from "../../domain/models/IDelivery";
import { DeliveryService } from "../services/delivery.service";

class DeliveryController {
  private deliveryService: DeliveryService;

  private deliveryUseCase: DeliveryUseCase;

  constructor() {
    this.deliveryService = new DeliveryService();
    this.deliveryUseCase = new DeliveryUseCase();
  }

  createDelivery(delivery: ICreateDelivery) {
    return this.deliveryUseCase.createDelivery(this.deliveryService, delivery);
  }
}
export default DeliveryController;
