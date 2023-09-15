import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertGharBatoPramanit = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.gharBatoPramanit.insertGharBatoPar.method,
    apiUrls.sifarish.gharBatoPramanit.insertGharBatoPar.url,
    data
  );
  return response;
};

export const getGharBatoPramanit = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.gharBatoPramanit.getGharBatoPar.method,
    apiUrls.sifarish.gharBatoPramanit.getGharBatoPar.url
  );
  return response;
};

export const updateGharBatoPramanit = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.gharBatoPramanit.gharBatoUpdate.method,
    apiUrls.sifarish.gharBatoPramanit.gharBatoUpdate.url + `?id=${id}`
  );
  return response;
};

export const insertDocsGharBatoPramanit = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.gharBatoPramanit.insertDocsForGHarBato.method,
    apiUrls.sifarish.gharBatoPramanit.insertDocsForGHarBato.url,
    data
  );
  return response;
};

export const getDocsGharBatoPramanit = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.gharBatoPramanit.getDocsForGHarBato.method,
    apiUrls.sifarish.gharBatoPramanit.getDocsForGHarBato.url + `?id=${id}`
  );
  return response;
};

export const printGharBatoPramanit = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.gharBatoPramanit.printGHarBato.method,
    apiUrls.sifarish.gharBatoPramanit.printGHarBato.url + `?id=${id}`
  );
  return response;
};
