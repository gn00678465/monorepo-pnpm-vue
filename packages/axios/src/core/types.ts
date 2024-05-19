import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface RequestOption<ResponseData = unknown> {
  retries: number;
  onRequest: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onError: (error: AxiosError<ResponseData>) => void | Promise<void>;
}
