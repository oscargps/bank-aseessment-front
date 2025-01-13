import { ICreateDelivery, IDeliveryResponse } from '../../domain/models/IDelivery';
import { DeliveryService } from '../../infrastructure/services/delivery.service';

export class DeliveryUseCase {
  async createDelivery(RequestService: DeliveryService, delivery:ICreateDelivery): Promise<IDeliveryResponse[]> {
    return await RequestService.createDelivery(delivery);
  }
}
