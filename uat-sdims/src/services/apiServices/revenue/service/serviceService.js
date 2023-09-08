import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const service = async () => {
  let response = await revenueApi(
    apiUrls.revenue.service.service.method,
    apiUrls.revenue.service.service.url,
  );
  return response
};
export const createService = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.service.createService.method,
    apiUrls.revenue.service.createService.url,
    data
  );
  return response;
};
