import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const budgetType = async () => {
  let response = await planningApi(
    apiUrls.planning.budgetType.budgetType.method,
    apiUrls.planning.budgetType.budgetType.url,
  );
  return response
};
export const createBudgetType = async (data) => {
  let response = await planningApi(
    apiUrls.planning.budgetType.createBudgetType.method,
    apiUrls.planning.budgetType.createBudgetType.url,
    data
  );
  return response;
};
export const deleteBudgetType = async (id) => {
    let response = await planningApi(
      apiUrls.planning.budgetType.deleteBudgetType.method,
      apiUrls.planning.budgetType.deleteBudgetType.url + `${id}`,
    );
    return response;
  };