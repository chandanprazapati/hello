import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertAayaShrot = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aayaShrot.insertAayaShrot.method,
    apiUrls.sifarish.aayaShrot.insertAayaShrot.url,
    data
  );
  return response;
};
export const getAayaShrot = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aayaShrot.getAayaShrot.method,
    apiUrls.sifarish.aayaShrot.getAayaShrot.url
  );
  return response;
};
export const AayaShrotPrint = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aayaShrot.aayaShrotPrint.method,
    apiUrls.sifarish.aayaShrot.aayaShrotPrint.url + `?id=${id}`
  );
  return response;
};

export const InsertAayaShrotFiles = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aayaShrot.insertAayaShrotFile.method,
    apiUrls.sifarish.aayaShrot.insertAayaShrotFile.url,
    data
  );
  return response;
};
export const getAayaShrotFiles = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aayaShrot.getAayaShrotFile.method,
    apiUrls.sifarish.aayaShrot.getAayaShrotFile.url + `?id=${id}`
  );
  return response;
};
