import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const takeoverType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.takeoverType.takeoverType.method,
    apiUrls.revenue.takeoverType.takeoverType.url,
  );
  return response
};
export const createTakeoverType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.takeoverType.createTakeoverType.method,
    apiUrls.revenue.takeoverType.createTakeoverType.url,
    data
  );
  return response;
};
