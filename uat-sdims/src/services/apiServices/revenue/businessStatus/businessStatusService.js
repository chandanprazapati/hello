import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const businessStatus = async () => {
  let response = await revenueApi(
    apiUrls.revenue.businessStatus.businessStatus.method,
    apiUrls.revenue.businessStatus.businessStatus.url,
  );
  return response
};
export const createBusinessStatus = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.businessStatus.createBusinessStatus.method,
    apiUrls.revenue.businessStatus.createBusinessStatus.url,
    data
  );
  return response;
};
