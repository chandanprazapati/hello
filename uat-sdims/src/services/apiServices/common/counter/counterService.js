import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const counter = async () => {
  let response = await commonApi(
    apiUrls.common.counter.counter.method,
    apiUrls.common.counter.counter.url,
  );
  return response
};
export const createCounter = async (data) => {
  let response = await commonApi(
    apiUrls.common.counter.createCounter.method,
    apiUrls.common.counter.createCounter.url,
    data
  );
  return response;
};


