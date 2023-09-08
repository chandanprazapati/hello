import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertAnnualIncome = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.annualIncome.insertAnnualIncome.method,
    apiUrls.sifarish.annualIncome.insertAnnualIncome.url,
    data
  );
  return response;
};
export const getAllAnnualIncome = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.annualIncome.getAllAnnualIncome.method,
    apiUrls.sifarish.annualIncome.getAllAnnualIncome.url
  );
  return response;
};
export const editAnnualIncome = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.annualIncome.getAnnualIncomeForUpdate.method,
    apiUrls.sifarish.annualIncome.getAnnualIncomeForUpdate.url + `?id=${id}`
  );
  return response;
};

export const insertAnnualIncomeFiles = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.annualIncome.insertAnnualIncomeFiles.method,
    apiUrls.sifarish.annualIncome.insertAnnualIncomeFiles.url,
    data
  );
  return response;
};
export const getAnnualIncomeFiles = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.annualIncome.getAnnualIncomeFile.method,
    apiUrls.sifarish.annualIncome.getAnnualIncomeFile.url + `?id=${id}`
  );
  return response;
};
export const getAnnualIncomePrint = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.annualIncome.annualIncomePrint.method,
    apiUrls.sifarish.annualIncome.annualIncomePrint.url + `?id=${id}`
  );
  return response;
};
