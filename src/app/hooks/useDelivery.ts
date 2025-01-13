import { useMutation } from "@tanstack/react-query";
import { ICreateDelivery } from "../../modules/bank-store/domain/models/IDelivery";
import DeliveryController from "../../modules/bank-store/infrastructure/controllers/delivery.controller";

const deliveryController = new DeliveryController();

export const useCreateDelivery = () => useMutation({
    mutationFn: (delivery: ICreateDelivery) => {
        return deliveryController.createDelivery(delivery)
    },
});
