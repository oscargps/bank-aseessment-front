import { METHODS, RequestService } from '../../../modules/core/bussiness/helpers/serviceHelper';

declare const global: any;
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ test: 100 }),
    }),
) as jest.Mock;
jest.mock('../../../config', () => ({
    apikey: '123456'
}));
describe('RequestService', () => {
    const mockUrl = 'https://api.example.com/resource';
    const mockHeaders = { Authorization: 'Bearer token' };
    const mockBody = { key: 'value' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should make a GET request successfully', async () => {
        const mockResponse = { data: 'test' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await RequestService({ url: mockUrl, method: METHODS.GET });


        expect(result).toEqual(mockResponse);
    });

    it('should make a POST request successfully', async () => {
        const mockResponse = { success: true };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await RequestService({
            url: mockUrl,
            method: METHODS.POST,
            body: mockBody,
            headers: mockHeaders,
        });


        expect(result).toEqual(mockResponse);
    });

    it('should throw an error if response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect(
            RequestService({ url: mockUrl, method: METHODS.GET })
        ).rejects.toThrow('Response status: 404');
    });

    it('should throw an error if fetch fails', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        await expect(
            RequestService({ url: mockUrl, method: METHODS.GET })
        ).rejects.toThrow('Network Error');
    });
});
