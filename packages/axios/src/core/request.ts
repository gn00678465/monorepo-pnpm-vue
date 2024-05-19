/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import type {
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosInstance
} from 'axios';
import axiosRetry from 'axios-retry';
import { nanoid } from 'nanoid';
import {
  createAxiosConfig,
  createRetryOptions,
  createDefaultOptions
} from './options';
import { REQUEST_ID_KEY } from './constant';
import type { RequestOption } from './types';

function createCommonRequest<ResponseData = any>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData>>
) {
  const opts = createDefaultOptions<ResponseData>(options);

  const _axiosConfig = createAxiosConfig(axiosConfig);
  const instance: AxiosInstance = axios.create(_axiosConfig);

  // config axios retry
  const retryOptions = createRetryOptions(opts.retries, _axiosConfig);
  axiosRetry(instance, retryOptions);

  instance.interceptors.request.use((conf) => {
    const config: InternalAxiosRequestConfig = { ...conf };

    // set request id
    const requestId = nanoid();
    config.headers.set(REQUEST_ID_KEY, requestId);

    // handle config by hook
    const handledConfig = opts.onRequest?.(config) || config;

    return handledConfig;
  });

  instance.interceptors.response.use(
    async (response) => {
      return Promise.resolve(response);
    },
    async (error: AxiosError<ResponseData>) => {
      await opts.onError(error);
      return Promise.reject(error);
    }
  );

  return {
    instance
  };
}

/**
 * create a request instance
 *
 * @param axiosConfig axios config
 * @param options request options
 */

export function createRequest<ResponseData = any>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData>>
) {
  const { instance } = createCommonRequest<ResponseData>(axiosConfig, options);

  // const request = async function request<
  //   T = ResponseData,
  //   R = AxiosResponse<T>,
  //   D = any
  // >(config: AxiosRequestConfig<D>) {
  //   const response = await instance<T, R, D>(config);
  //   return response;
  // };

  return instance;
}
