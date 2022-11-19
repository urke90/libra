import { useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import axios from 'api/axios.config';

interface IuseAxios {
    isLoading: boolean;
    error: string | null;
    sendRequest: (
        config: AxiosRequestConfig
    ) => Promise<AxiosResponse<any, any> | undefined>;
    handleClearError: () => void;
}

export const useAxios = (): IuseAxios => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = useCallback(async (config: AxiosRequestConfig) => {
        try {
            setIsLoading(true);

            const response = await axios.request(config);
            setIsLoading(false);
            return response;
        } catch (error) {
            setIsLoading(false);
            const err = error as AxiosError;
            setError('Ooops something went wrong');
            console.log('err', err);
        }
    }, []);

    const handleClearError = useCallback(() => setError(null), []);

    return {
        isLoading,
        error,
        sendRequest,
        handleClearError
    };
};
