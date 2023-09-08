import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const taxPayerType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.taxPayerType.taxPayerType.method,
    apiUrls.revenue.taxPayerType.taxPayerType.url,
  );
  return response
};
export const createTaxPayerType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.taxPayerType.createTaxPayerType.method,
    apiUrls.revenue.taxPayerType.createTaxPayerType.url,
    data
  );
  return response;
};
