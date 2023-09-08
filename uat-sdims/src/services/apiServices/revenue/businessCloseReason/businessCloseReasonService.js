import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const businessCloseReason = async () => {
  let response = await revenueApi(
    apiUrls.revenue.businessCloseReason.businessCloseReason.method,
    apiUrls.revenue.businessCloseReason.businessCloseReason.url,
  );
  return response
};
export const createBusinessCloseReason = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.businessCloseReason.createBusinessCloseReason.method,
    apiUrls.revenue.businessCloseReason.createBusinessCloseReason.url,
    data
  );
  return response;
};
