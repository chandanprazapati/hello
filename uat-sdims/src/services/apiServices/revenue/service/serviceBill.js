import apiUrls from "../../../apiUrls";
import { controllerApi } from "../../../apiHelpers";

export const serviceBill = async () => {
  let response = await controllerApi(
    apiUrls.controller.serviceBill.serviceBill.method,
    apiUrls.controller.serviceBill.serviceBill.url
  );
  return response;
};
export const createServiceBill = async (data) => {
  let response = await controllerApi(
    apiUrls.controller.serviceBill.createServiceBill.method,
    apiUrls.controller.serviceBill.createServiceBill.url,
    data
  );
  return response;
};
export const searchServiceBill = async (string, number) => {
  let response = await controllerApi(
    apiUrls.controller.serviceBill.searchServiceBill.method,
    apiUrls.controller.serviceBill.searchServiceBill.url +
      `${string?`?name=${string}`:""}${number?`&number=${number}`:""}`
  );
  return response;
};
export const generateReceipt = async (id) => {
  let response = await controllerApi(
    apiUrls.controller.generateReceipt.generateReceipt.method,
    apiUrls.controller.generateReceipt.generateReceipt.url + `?id=${id}`
  );
  return response;
}
