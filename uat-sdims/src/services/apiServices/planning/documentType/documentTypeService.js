import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const documentType = async () => {
  let response = await planningApi(
    apiUrls.planning.documentType.documentType.method,
    apiUrls.planning.documentType.documentType.url,
  );
  return response
};
export const createDocumentType = async (data) => {
  let response = await planningApi(
    apiUrls.planning.documentType.createDocumentType.method,
    apiUrls.planning.documentType.createDocumentType.url,
    data
  );
  return response;
};
export const deleteDocumentType = async (id) => {
    let response = await planningApi(
      apiUrls.planning.documentType.deleteDocumentType.method,
      apiUrls.planning.documentType.deleteDocumentType.url + `${id}`,
    );
    return response;
  };