import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const businessType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.businessType.businessType.method,
    apiUrls.revenue.businessType.businessType.url,
  );
  return response
};
export const createBusinessType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.businessType.createBusinessType.method,
    apiUrls.revenue.businessType.createBusinessType.url,
    data
  );
  return response;
};
