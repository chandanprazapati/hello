import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const budgetSubType = async () => {
  let response = await planningApi(
    apiUrls.planning.budgetSubType.budgetSubType.method,
    apiUrls.planning.budgetSubType.budgetSubType.url,
  );
  return response
};
export const createBudgetSubType = async (data) => {
  let response = await planningApi(
    apiUrls.planning.budgetSubType.createBudgetSubType.method,
    apiUrls.planning.budgetSubType.createBudgetSubType.url,
    data
  );
  return response;
};
export const deleteBudgetSubType = async (id) => {
    let response = await planningApi(
      apiUrls.planning.budgetSubType.deleteBudgetSubType.method,
      apiUrls.planning.budgetSubType.deleteBudgetSubType.url + `${id}`,
    );
    return response;
  };