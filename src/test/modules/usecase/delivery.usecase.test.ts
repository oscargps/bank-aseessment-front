import { DeliveryUseCase } from "../../../modules/bank-store/bussiness/usecases/delivery.usecase";
import { ICreateDelivery } from "../../../modules/bank-store/domain/models/IDelivery";
import { DeliveryService } from "../../../modules/bank-store/infrastructure/services/delivery.service";
import { DeliveryResponseMock } from "../../__mocks__/delivery.mock";

jest.mock(
    "../../../modules/bank-store/infrastructure/services/delivery.service"
);

describe("DeliveryUseCase", () => {
    let deliveryUseCase: DeliveryUseCase;
    let mockDeliveryService: jest.Mocked<DeliveryService>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockDeliveryService = {
            createDelivery: jest.fn(),
            getDeliveryStatus: jest.fn(),
        } as unknown as jest.Mocked<DeliveryService>;
        deliveryUseCase = new DeliveryUseCase();
    });

    describe("create Delivery", () => {
        test("should successfully create a delivery", async () => {
            const deliveryRequest: ICreateDelivery = {
                address: "string",
                customerId: 1,
                reference: "string",
            };
            mockDeliveryService.createDelivery.mockResolvedValue(
                DeliveryResponseMock
            );

            const result = await deliveryUseCase.createDelivery(
                mockDeliveryService,
                deliveryRequest
            );

            expect(mockDeliveryService.createDelivery).toHaveBeenCalledWith(
                deliveryRequest
            );
            expect(result).toEqual(DeliveryResponseMock);
        });

        test("should throw error when delivery creation fails", async () => {
            const mockError = new Error("Failed to create transaction");
            mockDeliveryService.createDelivery.mockRejectedValue(mockError);

            await expect(
                deliveryUseCase.createDelivery(mockDeliveryService, {
                    address: "string",
                    customerId: 1,
                    reference: "string",
                })
            ).rejects.toThrow("Failed to create transaction");
        });
    });

    describe("getDeliveryStatus", () => {
        const mockReference = "ref_123";

        test("should successfully get delivery status", async () => {
            mockDeliveryService.getDeliveryStatus.mockResolvedValue(DeliveryResponseMock);

            const result = await deliveryUseCase.getDeliveryStatus(
                mockDeliveryService,
                mockReference
            );

            expect(mockDeliveryService.getDeliveryStatus).toHaveBeenCalledWith(
                mockReference
            );
            expect(result).toEqual(DeliveryResponseMock);
        });

        test("should propagate error when getting delivery status fails", async () => {
            const mockError = new Error("Failed to get delivery status");
            mockDeliveryService.getDeliveryStatus.mockRejectedValue(mockError);

            await expect(
                deliveryUseCase.getDeliveryStatus(mockDeliveryService, mockReference)
            ).rejects.toThrow("Failed to get delivery status");
        });
    });
});
