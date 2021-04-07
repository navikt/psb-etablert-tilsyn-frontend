import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpErrorHandler } from '../types/HttpErrorHandler';
import { handleErrorExternally, httpErrorShouldBeHandledExternally } from './responseHelpers';

export async function get<T>(
    url: string,
    httpErrorHandler: HttpErrorHandler,
    requestConfig?: AxiosRequestConfig
): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.get(url, requestConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        if (httpErrorShouldBeHandledExternally(error)) {
            handleErrorExternally(error, httpErrorHandler);
        }
        throw new Error(error);
    }
}

export async function post<T>(
    url: string,
    body: T,
    httpErrorHandler: HttpErrorHandler,
    requestConfig?: AxiosRequestConfig
): Promise<any> {
    try {
        const response: AxiosResponse = await axios.post(url, body, requestConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        if (httpErrorShouldBeHandledExternally(error)) {
            handleErrorExternally(error, httpErrorHandler);
        }
        throw new Error(error);
    }
}
