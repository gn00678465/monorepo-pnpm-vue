import axios, { type AxiosRequestTransformer } from 'axios';

type TransformRequestOptions = Array<
  AxiosRequestTransformer | ((arg: unknown) => unknown)
>;

/**
 * 額外處理的 transformRequest
 * @param options
 * @returns {AxiosRequestTransformer[]}
 */
export function transformRequest(
  options: TransformRequestOptions = []
): AxiosRequestTransformer[] {
  const defaultTransformReq = axios.defaults.transformRequest;
  if (defaultTransformReq && Array.isArray(defaultTransformReq)) {
    return [...options, ...defaultTransformReq];
  }
  if (defaultTransformReq && !Array.isArray(defaultTransformReq)) {
    return [...options, defaultTransformReq];
  }
  return [];
}
