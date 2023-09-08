import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const indexTaxRate = async () => {
  let response = await revenueApi(
    apiUrls.revenue.indexTaxRate.indexTaxRate.method,
    apiUrls.revenue.indexTaxRate.indexTaxRate.url,
  );
  return response
};
export const createIndexTaxRate = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.indexTaxRate.createIndexTaxRate.method,
    apiUrls.revenue.indexTaxRate.createIndexTaxRate.url,
    data
  );
  return response;
};
export const searchIndexTaxRate = async () => {
let response = await controllerApi(
    apiUrls.revenue.serviceBill.editIndexTaxRate.method,
    apiUrls.revenue.serviceBill.editIndexTaxRate.url+`?isNew=${true}&pageNo=${1}`,
  );
  return response;
};