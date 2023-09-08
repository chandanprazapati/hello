import apiUrls from "../../../apiUrls";
import { controllerApi } from "../../../apiHelpers";

export const createMultiplelandDetail = async (data) => {
  let response = await controllerApi(
    apiUrls.revenue.landDetail.createMultiplelandDetail.method,
    apiUrls.revenue.landDetail.createMultiplelandDetail.url,
    data
  );
  return response
};

export const createLandDetail = async (data) => {
  let response = await controllerApi(
    apiUrls.revenue.landDetail.createLandDetail.method,
    apiUrls.revenue.landDetail.createLandDetail.url,
    data
  );
  return response
};

export const getTaxRateNames = async (number1,number2) => {
  let response = await controllerApi(
    apiUrls.revenue.landDetail.getTaxRateNames.method,
    apiUrls.revenue.landDetail.getTaxRateNames.url + `?subCatId=${number1}&fiscalId=${number2}`
  );
  return response
};