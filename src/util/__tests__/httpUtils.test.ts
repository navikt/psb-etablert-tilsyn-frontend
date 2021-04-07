import axios from 'axios';
import { get, post } from '../httpUtils';
import * as responseHelpers from '../responseHelpers';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('httpUtils', () => {
    const mockedErrorHandler = () => null;

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => null);
    });

    describe('get', () => {
        const goodResponseMock = { data: 'mockedData' };
        const badRequestResponseMock = { response: { status: 400, headers: {} } };

        it('should return the data-property from the response when the promise resolved', async () => {
            axiosMock.get.mockImplementation(() => Promise.resolve(goodResponseMock));
            const data = await get('', () => null);
            expect(data).toEqual(goodResponseMock.data);
        });

        it('should throw an error and console.error when the promise is rejected', async () => {
            axiosMock.get.mockImplementation(() => Promise.reject(badRequestResponseMock));
            const error = get('', () => null);
            await expect(error).rejects.toThrow();
            expect(console.error).toHaveBeenCalledWith(badRequestResponseMock);
        });

        it('should call function triggering the provided httpErrorHandler when required', async () => {
            const httpErrorHandlerCaller = jest.spyOn(responseHelpers, 'handleErrorExternally');
            const checkerFn = jest.spyOn(responseHelpers, 'httpErrorShouldBeHandledExternally');
            checkerFn.mockReturnValueOnce(true);

            axiosMock.get.mockImplementation(() => Promise.reject(badRequestResponseMock));

            const error = get('', mockedErrorHandler);
            await expect(error).rejects.toThrow('');
            expect(httpErrorHandlerCaller).toHaveBeenCalledWith(badRequestResponseMock, mockedErrorHandler);
            httpErrorHandlerCaller.mockReset();
        });

        it('should avoid calling function triggering httpErrorHandler when unneccessary', async () => {
            const httpErrorHandlerCaller = jest.spyOn(responseHelpers, 'handleErrorExternally');
            const checkerFn = jest.spyOn(responseHelpers, 'httpErrorShouldBeHandledExternally');
            checkerFn.mockReturnValueOnce(false);

            axiosMock.get.mockImplementation(() => Promise.reject(badRequestResponseMock));

            await expect(get('', mockedErrorHandler)).rejects.toThrow('');
            expect(httpErrorHandlerCaller).not.toHaveBeenCalled();
            httpErrorHandlerCaller.mockReset();
        });
    });

    describe('post', () => {
        const goodResponseMock = { data: 'mockedData' };
        const badRequestResponseMock = { response: { status: 400, headers: {} } };

        it('should return the data-property from the response when the promise resolved', async () => {
            axiosMock.post.mockImplementation(() => Promise.resolve(goodResponseMock));
            const data = await post('', null, null);
            expect(data).toEqual(goodResponseMock.data);
        });

        it('should throw an error and console.error when the promise is rejected', async () => {
            axiosMock.post.mockImplementation(() => Promise.reject(badRequestResponseMock));
            const error = post('', null, null);
            await expect(error).rejects.toThrow();
            expect(console.error).toHaveBeenCalledWith(badRequestResponseMock);
        });

        it('should call function triggering the provided httpErrorHandler when required', async () => {
            const httpErrorHandlerCaller = jest.spyOn(responseHelpers, 'handleErrorExternally');
            const checkerFn = jest.spyOn(responseHelpers, 'httpErrorShouldBeHandledExternally');
            checkerFn.mockReturnValueOnce(true);

            axiosMock.post.mockImplementation(() => Promise.reject(badRequestResponseMock));

            const error = post('', null, mockedErrorHandler);
            await expect(error).rejects.toThrow('');
            expect(httpErrorHandlerCaller).toHaveBeenCalledWith(badRequestResponseMock, mockedErrorHandler);
            httpErrorHandlerCaller.mockReset();
        });

        it('should avoid calling function triggering httpErrorHandler when unneccessary', async () => {
            const httpErrorHandlerCaller = jest.spyOn(responseHelpers, 'handleErrorExternally');
            const checkerFn = jest.spyOn(responseHelpers, 'httpErrorShouldBeHandledExternally');
            checkerFn.mockReturnValueOnce(false);

            axiosMock.post.mockImplementation(() => Promise.reject(badRequestResponseMock));

            await expect(post('', null, mockedErrorHandler)).rejects.toThrow('');
            expect(httpErrorHandlerCaller).not.toHaveBeenCalled();
            httpErrorHandlerCaller.mockReset();
        });
    });
});
