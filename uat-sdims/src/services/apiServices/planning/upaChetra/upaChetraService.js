import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const upaChetra = async () => {
  let response = await planningApi(
    apiUrls.planning.upaChetra.upaChetra.method,
    apiUrls.planning.upaChetra.upaChetra.url,
  );
  return response
};
export const createUpaChetra = async (data) => {
  let response = await planningApi(
    apiUrls.planning.upaChetra.createUpaChetra.method,
    apiUrls.planning.upaChetra.createUpaChetra.url,
    data
  );
  return response;
};
export const deleteUpaChetra = async (id) => {
    let response = await planningApi(
      apiUrls.planning.upaChetra.deleteUpaChetra.method,
      apiUrls.planning.upaChetra.deleteUpaChetra.url + `${id}` ,
    );
    return response;
  };