import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertBusinessRegistration = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessRegistration.insertBusinessRegistration.method,
    apiUrls.sifarish.businessRegistration.insertBusinessRegistration.url,
    data
  );
  return response;
};
export const getBusinessRegistration = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessRegistration.getBusinessRegistration.method,
    apiUrls.sifarish.businessRegistration.getBusinessRegistration.url
  );
  return response;
};
export const businessRegistrationPrint = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessRegistration.businessRegistrationPrint.method,
    apiUrls.sifarish.businessRegistration.businessRegistrationPrint.url +
      `?id=${id}`
  );
  return response;
};

export const insertBusinessFile = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessRegistration.insertFileBusinessRegistration.method,
    apiUrls.sifarish.businessRegistration.insertFileBusinessRegistration.url,
    data
  );
  return response;
};

export const getBusinessFile = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessRegistration.getFileBusinessRegistration.method,
    apiUrls.sifarish.businessRegistration.getFileBusinessRegistration.url +
      `?id=${id}`
  );
  return response;
};

export const BusinessRegUpdate = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.businessRegistration.businessRegistrationUpdates.method,
    apiUrls.sifarish.businessRegistration.businessRegistrationUpdates.url +
      `?id=${id}`
  );
  return response;
};
