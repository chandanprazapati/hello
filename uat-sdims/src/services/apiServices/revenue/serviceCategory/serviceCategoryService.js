import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const serviceCategory = async () => {
  let response = await revenueApi(
    apiUrls.revenue.serviceCategory.serviceCategory.method,
    apiUrls.revenue.serviceCategory.serviceCategory.url,
  );
  return response
};
export const createServiceCategory = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.serviceCategory.createServiceCategory.method,
    apiUrls.revenue.serviceCategory.createServiceCategory.url,
    data
  );
  return response;
};
