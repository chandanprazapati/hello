import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const budgetSource = async () => {
  let response = await planningApi(
    apiUrls.planning.budgetSource.budgetSource.method,
    apiUrls.planning.budgetSource.budgetSource.url,
  );
  return response
};
export const createBudgetSource = async (data) => {
  let response = await planningApi(
    apiUrls.planning.budgetSource.createBudgetSource.method,
    apiUrls.planning.budgetSource.createBudgetSource.url,
    data
  );
  return response;
};
export const deleteBudgetSource = async (id) => {
    let response = await planningApi(
      apiUrls.planning.budgetSource.deleteBudgetSource.method,
      apiUrls.planning.budgetSource.deleteBudgetSource.url + `${id}`,
    );
    return response;
  };