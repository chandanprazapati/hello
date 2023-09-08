import apiUrls from "../../../apiUrls";
import { controllerApi } from "../../../apiHelpers";

export const taxPayerDetail = async () => {
  let response = await controllerApi(
    apiUrls.controller.taxPayerDetail.taxPayerDetail.method,
    apiUrls.controller.taxPayerDetail.taxPayerDetail.url
  );
  return response
};
export const createTaxPayerDetail = async (data) => {
  let response = await controllerApi(
    apiUrls.controller.taxPayerDetail.createTaxPayerDetail.method,
    apiUrls.controller.taxPayerDetail.createTaxPayerDetail.url,
    data
  );
  return response;
};
