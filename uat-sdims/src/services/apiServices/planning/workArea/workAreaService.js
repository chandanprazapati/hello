import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const workArea = async () => {
  let response = await planningApi(
    apiUrls.planning.workArea.workArea.method,
    apiUrls.planning.workArea.workArea.url,
  );
  return response
};
export const createWorkArea = async (data) => {
  let response = await planningApi(
    apiUrls.planning.workArea.createWorkArea.method,
    apiUrls.planning.workArea.createWorkArea.url,
    data
  );
  return response;
};
export const deleteWorkArea = async (id) => {
    let response = await planningApi(
      apiUrls.planning.workArea.deleteWorkArea.method,
      apiUrls.planning.workArea.deleteWorkArea.url +`${id}`,
    );
    return response;
  };