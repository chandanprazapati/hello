import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertSadakKhanne = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sadakKhanee.insertSadakKhanne.method,
    apiUrls.sifarish.sadakKhanee.insertSadakKhanne.url,
    data
  );
  return response;
};

export const getSadakKhanne = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sadakKhanee.getSadakKhanne.method,
    apiUrls.sifarish.sadakKhanee.getSadakKhanne.url
  );
  return response;
};

export const updateSadakKhanne = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sadakKhanee.updateSadakKhanne.method,
    apiUrls.sifarish.sadakKhanee.updateSadakKhanne.url + `?id=${id}`
  );
  return response;
};

export const sadakKhanneFile = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sadakKhanee.sadakKhaneeFileUpload.method,
    apiUrls.sifarish.sadakKhanee.sadakKhaneeFileUpload.url,
    data
  );
  return response;
};

export const getSadakKhanneFile = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sadakKhanee.getsadakKhaneeFileUpload.method,
    apiUrls.sifarish.sadakKhanee.getsadakKhaneeFileUpload.url + `?id=${id}`
  );
  return response;
};

export const SadakKhannePrint = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sadakKhanee.printSadakKhanne.method,
    apiUrls.sifarish.sadakKhanee.printSadakKhanne.url + `?id=${id}`
  );
  return response;
};
