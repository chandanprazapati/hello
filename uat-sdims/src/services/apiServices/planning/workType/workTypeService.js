import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const workType = async () => {
  let response = await planningApi(
    apiUrls.planning.workType.workType.method,
    apiUrls.planning.workType.workType.url,
  );
  return response
};
export const createWorkType = async (data) => {
  let response = await planningApi(
    apiUrls.planning.workType.createWorkType.method,
    apiUrls.planning.workType.createWorkType.url,
    data
  );
  return response;
};
export const deleteWorkType = async (id) => {
    let response = await planningApi(
      apiUrls.planning.workType.deleteWorkType.method,
      apiUrls.planning.workType.deleteWorkType.url + `${id}`,
    );
    return response;
  };