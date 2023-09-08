import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertBusinessClose = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessCloseRegistration.insertBusinessCloseRegistration
      .method,
    apiUrls.sifarish.businessCloseRegistration.insertBusinessCloseRegistration
      .url,
    data
  );
  return response;
};
export const getBusinnessClose = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessCloseRegistration.getBusinessCloseRegistration
      .method,
    apiUrls.sifarish.businessCloseRegistration.getBusinessCloseRegistration.url
  );
  return response;
};
export const businnessClosePrint = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessCloseRegistration.businessClosePrint.method,
    apiUrls.sifarish.businessCloseRegistration.businessClosePrint.url +
      `?id=${id}`
  );
  return response;
};
export const businessCloseFileUpload = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessCloseRegistration.businessCloseFileUpload.method,
    apiUrls.sifarish.businessCloseRegistration.businessCloseFileUpload.url,
    data
  );
  return response;
};

export const getBusinessCloseFielUpload = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessCloseRegistration.getBusinessCloseFielUpload
      .method,
    apiUrls.sifarish.businessCloseRegistration.getBusinessCloseFielUpload.url +
      `?id=${id}`
  );
  return response;
};

export const getBusinessCloseFormUpdate = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessCloseRegistration.getBusinessCloseUpdates.method,
    apiUrls.sifarish.businessCloseRegistration.getBusinessCloseUpdates.url +
      `?id=${id}`
  );
  return response;
};
