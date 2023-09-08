import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const relation = async () => {
  let response = await commonApi(
    apiUrls.common.relation.relation.method,
    apiUrls.common.relation.relation.url,
  );
  return response
};
export const createRelation = async (data) => {
  let response = await commonApi(
    apiUrls.common.relation.createRelation.method,
    apiUrls.common.relation.createRelation.url,
    data
  );
  return response;
};


