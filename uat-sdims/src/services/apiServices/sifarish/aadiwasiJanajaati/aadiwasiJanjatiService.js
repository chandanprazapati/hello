import apiUrls from "../../../apiUrls";
import { sifarishAPi } from "../../../apiHelpers";

export const aadibasiJanjati = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aadibasiJanjati.aadibasiJanjati.method,
    apiUrls.sifarish.aadibasiJanjati.aadibasiJanjati.url
  );
  return response;
};
export const insertAadibasiJanjati = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aadibasiJanjati.insertAadibasiJanjati.method,
    apiUrls.sifarish.aadibasiJanjati.insertAadibasiJanjati.url,
    data
  );
  return response;
};

export const getAadibasiType = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aadibasiJanjati.aadbasiType.method,
    apiUrls.sifarish.aadibasiJanjati.aadbasiType.url
  );
  return response;
};

export const updateAadibasiJanjati = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aadibasiJanjati.updateAadibasiJanjati.method,
    apiUrls.sifarish.aadibasiJanjati.updateAadibasiJanjati.url + `?id=${id}`
  );
  return response;
};

export const getAadibasiJanjatiFiles = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aadibasiJanjati.getAadibasiFile.method,
    apiUrls.sifarish.aadibasiJanjati.getAadibasiFile.url + `?id=${id}`
  );
  return response;
};

export const insertAadibasiJanjatiFiles = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aadibasiJanjati.insertAadibasiFile.method,
    apiUrls.sifarish.aadibasiJanjati.insertAadibasiFile.url,
    data
  );
  return response;
};

export const printsAdibasi = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.aadibasiJanjati.printAdibasi.method,
    apiUrls.sifarish.aadibasiJanjati.printAdibasi.url + `?id=${id}`
  );
  return response;
};
