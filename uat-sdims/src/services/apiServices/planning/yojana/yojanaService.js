import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const yojana = async () => {
  let response = await planningApi(
    apiUrls.planning.yojana.yojana.method,
    apiUrls.planning.yojana.yojana.url,
  );
  return response
};
export const createYojana = async (data) => {
  let response = await planningApi(
    apiUrls.planning.yojana.createYojana.method,
    apiUrls.planning.yojana.createYojana.url,
    data
  );
  return response;
};
export const deleteYojana = async (id) => {
    let response = await planningApi(
      apiUrls.planning.yojana.deleteYojana.method,
      apiUrls.planning.yojana.deleteYojana.url + `${id}`,
    );
    return response;
  };