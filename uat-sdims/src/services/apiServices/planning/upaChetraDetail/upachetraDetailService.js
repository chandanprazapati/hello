import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const upaChetraDetail = async () => {
  let response = await planningApi(
    apiUrls.planning.upaChetraDetail.upaChetraDetail.method,
    apiUrls.planning.upaChetraDetail.upaChetraDetail.url,
  );
  return response
};
export const createUpaChetraDetail = async (data) => {
  let response = await planningApi(
    apiUrls.planning.upaChetraDetail.createUpaChetraDetail.method,
    apiUrls.planning.upaChetraDetail.createUpaChetraDetail.url,
    data
  );
  return response;
};
export const deleteUpaChetraDetail = async (id) => {
    let response = await planningApi(
      apiUrls.planning.upaChetraDetail.deleteUpaChetraDetail.method,
      apiUrls.planning.upaChetraDetail.deleteUpaChetraDetail.url + `${id}`,
    );
    return response;
  };