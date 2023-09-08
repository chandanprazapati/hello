import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const taxSubCategory = async () => {
  let response = await revenueApi(
    apiUrls.revenue.taxSubCategory.taxSubCategory.method,
    apiUrls.revenue.taxSubCategory.taxSubCategory.url,
  );
  return response
};
export const createTaxSubCategory = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.taxSubCategory.createTaxSubCategory.method,
    apiUrls.revenue.taxSubCategory.createTaxSubCategory.url,
    data
  );
  return response;
};
