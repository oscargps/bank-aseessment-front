import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateDelivery } from "../../modules/bank-store/domain/models/IDelivery";
import DeliveryController from "../../modules/bank-store/infrastructure/controllers/delivery.controller";

const deliveryController = new DeliveryController();

export const useCreateDelivery = () => useMutation({
    mutationFn: (delivery: ICreateDelivery) => {
        return deliveryController.createDelivery(delivery)
    },
});

export const useGetDeliveryStatus = (reference:ICreateDelivery['reference']) => useQuery(
    ['DeliveryStatus'],
    () => deliveryController.getDeliveryStatus(reference),
    {
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    }
);

