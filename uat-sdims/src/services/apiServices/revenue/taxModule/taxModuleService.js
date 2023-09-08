import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const taxModule = async () => {
  let response = await revenueApi(
    apiUrls.revenue.taxModule.taxModule.method,
    apiUrls.revenue.taxModule.taxModule.url,
  );
  return response
};
export const createTaxModule = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.taxModule.createTaxModule.method,
    apiUrls.revenue.taxModule.createTaxModule.url,
    data
  );
  return response;
};
