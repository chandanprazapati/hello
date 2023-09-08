import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const taxCategory = async () => {
  let response = await revenueApi(
    apiUrls.revenue.taxCategory.taxCategory.method,
    apiUrls.revenue.taxCategory.taxCategory.url,
  );
  return response
};
export const createTaxCategory = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.taxCategory.createTaxCategory.method,
    apiUrls.revenue.taxCategory.createTaxCategory.url,
    data
  );
  return response;
};
