import {  legalCaseAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const indexCaseSubType = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseSubType.indexCaseSubType.method,
    apiUrls.legalCase.indexCaseSubType.indexCaseSubType.url,
  );
  return response
};
export const createIndexCaseSubType = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseSubType.createIndexCaseSubType.method,
    apiUrls.legalCase.indexCaseSubType.createIndexCaseSubType.url,
    data
  );
  return response;
};