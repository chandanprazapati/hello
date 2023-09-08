import {  legalCaseAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const indexCaseType = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseType.indexCaseType.method,
    apiUrls.legalCase.indexCaseType.indexCaseType.url,
  );
  return response
};
export const createIndexCaseType = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseType.createIndexCaseType.method,
    apiUrls.legalCase.indexCaseType.createIndexCaseType.url,
    data
  );
  return response;
};