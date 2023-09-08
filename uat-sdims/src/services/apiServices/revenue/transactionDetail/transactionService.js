import { transactionApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const transcationDetail = async (number) => {
    let response = await transactionApi(
      apiUrls.controller.transcationDetail.transcationDetail.method,
      apiUrls.controller.transcationDetail.transcationDetail.url + `?taxPayerId=${number}`
    );
    return response
  };

  export const serviceTransaction = async (data) => {
    let response = await transactionApi(
      apiUrls.controller.transcationDetail.serviceTransaction.method,
      apiUrls.controller.transcationDetail.serviceTransaction.url,
      data
    );
    return response
  };