/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, shallowRef } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { noop, until } from '@vueuse/shared';

/**
 * request composable
 */
export interface UseAxiosOptions<T = any> {
  /**
   * Use shallowRef.
   *
   * @default true
   */
  shallow?: boolean;

  /**
   * Initial data to use
   */
  initialData?: T;

  /**
   * Sets the state to initialState before executing the promise.
   */
  resetOnExecute?: boolean;

  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void;

  /**
   * Callback when success is caught.
   */
  onSuccess?: (data: T) => void;

  /**
   * Callback when request is finished.
   */
  onFinish?: () => void;
}

type UseAxiosInstance = AxiosInstance;

export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>,
  options?: UseAxiosOptions<T>
): StrictUseAxiosReturn<T, R, D>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  instance?: UseAxiosInstance,
  options?: UseAxiosOptions<T>
): StrictUseAxiosReturn<T, R, D>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>,
  instance?: UseAxiosInstance,
  options?: UseAxiosOptions<T>
): StrictUseAxiosReturn<T, R, D>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>,
  options?: UseAxiosOptions<T>
): EasyUseAxiosReturn<T, R, D>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  instance?: UseAxiosInstance,
  options?: UseAxiosOptions<T>
): EasyUseAxiosReturn<T, R, D>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>,
  instance?: UseAxiosInstance,
  options?: UseAxiosOptions<T>
): EasyUseAxiosReturn<T, R, D>;
/**
 * Wrapper for axios.
 *
 */
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  ...args: any[]
): DiscriminatedUseAxiosReturn<T, R, D> {
  const defaultOptions: UseAxiosOptions<T> = {
    shallow: true
  };
  let url: string | undefined = undefined;
  let defaultConfig: AxiosRequestConfig<D> = {};
  let instance: AxiosInstance = axios;
  let options: UseAxiosOptions<T> = defaultOptions;

  const isAxiosInstance = (val: any) => !!val?.request;

  if (args.length > 0) {
    if (isAxiosInstance(args[0])) instance = args[0];
    else {
      defaultConfig = args[0] as AxiosRequestConfig<D>;
      url = (args[0] as AxiosRequestConfig<D>).url;
    }
  }

  if (args.length > 1) {
    if (isAxiosInstance(args[1])) instance = args[1];
  }

  if (args.length === 3) options = args[args.length - 1] || defaultOptions;

  const {
    shallow,
    initialData,
    resetOnExecute = false,
    onError = noop,
    onFinish,
    onSuccess = noop
  } = options;

  const response = shallowRef<AxiosResponse<T>>();
  const data = (shallow ? shallowRef : ref)<T>(initialData!) as Ref<T>;
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef<unknown>();

  let abortController: AbortController = new AbortController();

  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value) return;
    abortController.abort(message);
    abortController = new AbortController();
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };

  /**
   * Reset data to initialData
   */
  const resetData = () => {
    if (resetOnExecute) data.value = initialData!;
  };

  const loading = (loading: boolean) => {
    isLoading.value = loading;
    isFinished.value = !loading;
  };

  const waitUntilFinished = () =>
    new Promise<DiscriminatedUseAxiosReturn<T, R, D>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => (error.value ? reject(error.value) : resolve(result)));
    });

  const promise = {
    then: (...args) => waitUntilFinished().then(...args),
    catch: (...args) => waitUntilFinished().catch(...args)
  } as Promise<DiscriminatedUseAxiosReturn<T, R, D>>;

  const execute: DiscriminatedUseAxiosReturn<T, R, D>['execute'] = (
    executeUrl: string | AxiosRequestConfig<D> | undefined = url,
    config: AxiosRequestConfig<D> = {}
  ) => {
    error.value = undefined;
    const _url =
      typeof executeUrl === 'string' ? executeUrl : url ?? config.url;

    if (_url === undefined) {
      error.value = new AxiosError(AxiosError.ERR_INVALID_URL);
      isFinished.value = true;
      return promise;
    }
    resetData();

    abort();

    loading(true);
    isAborted.value = false;

    instance(_url, {
      ...defaultConfig,
      ...(typeof executeUrl === 'object' ? executeUrl : config),
      signal: abortController.signal
    })
      .then((res) => {
        if (isAborted.value) return;
        response.value = res;
        data.value = res.data;
        onSuccess(res.data);
      })
      .catch((e) => {
        error.value = e;
        onError(e);
      })
      .finally(() => {
        onFinish?.();
        loading(false);
      });
    return promise;
  };

  const result = {
    // data
    response,
    data,
    error,
    // methods
    execute,
    abort,
    // status
    isFinished,
    isLoading,
    isCanceled: isAborted
  } as DiscriminatedUseAxiosReturn<T, R, D>;

  return { ...result };
}

export type UseAxiosReturn<T> = {
  /**
   * Axios Response
   */
  response: ShallowRef<AxiosResponse<T> | undefined>;
  data: Ref<T | undefined>;
  error: ShallowRef<unknown | undefined>;
  abort: (message?: string) => void;
  isFinished: Ref<boolean>;
  isLoading: Ref<boolean>;
  isCanceled: Ref<boolean>;
};

export interface StrictUseAxiosReturn<T, R, D> extends UseAxiosReturn<T> {
  /**
   * Manually call the axios request
   */
  execute: (
    url?: AxiosRequestConfig<D> | string,
    config?: AxiosRequestConfig<D>
  ) => Promise<StrictUseAxiosReturn<T, R, D>>;
}
export interface EasyUseAxiosReturn<T, R, D> extends UseAxiosReturn<T> {
  /**
   * Manually call the axios request
   */
  execute: (
    url: string,
    config?: AxiosRequestConfig<D>
  ) => Promise<EasyUseAxiosReturn<T, R, D>>;
}

type DiscriminatedUseAxiosReturn<T, R, D> =
  | StrictUseAxiosReturn<T, R, D>
  | EasyUseAxiosReturn<T, R, D>;
