import apiUrls from "../../../apiUrls";
import { sifarishAPi } from "../../../apiHelpers";

export const awabihawit = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.awabihawit.awabihawit. method,
    apiUrls.sifarish.awabihawit.awabihawit.url

  );
  return response;
};
export const insertAwabihawit = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.awabihawit.insertAwabihawit.method,
    apiUrls.sifarish.awabihawit.insertAwabihawit.url,
    data
  );
  return response;
};

export const updateAwabihawit = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.awabihawit.updateAwabihawit.method,
    apiUrls.sifarish.awabihawit.updateAwabihawit.url +  `?id=${id}`
  );
  return response;
}

export const getAwabihawitFiles = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.awabihawit.getAwabihawitFiles.method,
    apiUrls.sifarish.awabihawit.getAwabihawitFiles.url +  `?id=${id}`
  );
  return response;
}

export const insertAwabihawitFiles = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.awabihawit.insertAwabihawitFiles.method,
    apiUrls.sifarish.awabihawit.insertAwabihawitFiles.url,
    data
  );
  return response;
}

export const awabihawitDetails = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.awabihawit.awabihawitDetails.method,
    apiUrls.sifarish.awabihawit.awabihawitDetails.url +  `?id=${id}`
  );
  return response;
}