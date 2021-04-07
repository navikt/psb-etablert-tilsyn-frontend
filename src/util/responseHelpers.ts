import { AxiosError } from 'axios';
import { HttpErrorHandler } from '../types/HttpErrorHandler';

export const isUnauthorized = (statusCode) => statusCode === 401;
export const isForbidden = (statusCode) => statusCode === 403;

export const httpErrorShouldBeHandledExternally = (error: AxiosError) => {
    if (error.response) {
        const { status } = error.response;
        return isForbidden(status) || isUnauthorized(status);
    }
    return false;
};

export const handleErrorExternally = (error: AxiosError, errorHandler: HttpErrorHandler) => {
    const { status, headers } = error.response;
    errorHandler(status, headers.location);
};
