import { useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import axios from '../api/axios.config';

interface IuseAxios {
    isLoading: boolean;
    error: boolean;
    sendRequest: (
        config: AxiosRequestConfig
    ) => Promise<AxiosResponse<any, any> | undefined>;
    handleClearError: () => void;
}

export const useAxios = (): IuseAxios => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const sendRequest = useCallback(async (config: AxiosRequestConfig) => {
        try {
            setError(false);
            setIsLoading(true);

            const response = await axios.request(config);
            setIsLoading(false);
            return response;
        } catch (error) {
            setIsLoading(false);
            const err = error as AxiosError;
            setError(true);
            console.log('err', err);
        }
    }, []);

    const handleClearError = useCallback(() => setError(false), []);

    return {
        isLoading,
        error,
        sendRequest,
        handleClearError
    };
};
