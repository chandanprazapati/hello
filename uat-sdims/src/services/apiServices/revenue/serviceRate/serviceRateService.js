import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const serviceRate = async () => {
  let response = await revenueApi(
    apiUrls.controller.serviceRate.serviceRate.method,
    apiUrls.controller.serviceRate.serviceRate.url,
  );
  return response
};
export const createServiceRate = async (data) => {
  let response = await revenueApi(
    apiUrls.controller.serviceRate.createServiceRate.method,
    apiUrls.controller.serviceRate.createServiceRate.url,
    data
  );
  return response;
};
export const searchServiceAccToFiscal = async (number) => {
  let response = await revenueApi(
    apiUrls.controller.serviceRate.searchAccToFiscal.method,
    apiUrls.controller.serviceRate.searchAccToFiscal.url+`?pageNo=${number}`,
  );
  return response;
};

export const insertServiceRate = async (data) => {
  let response = await revenueApi(
    apiUrls.controller.serviceRate.insertServiceRate.method,
    apiUrls.controller.serviceRate.insertServiceRate.url,
    data
  );
  return response;
};
export const getServiceList = async (data) => {
  let response = await revenueApi(
    apiUrls.controller.serviceRate.getServiceList.method,
    apiUrls.controller.serviceRate.getServiceList.url,
    data
  );
  return response;
};
