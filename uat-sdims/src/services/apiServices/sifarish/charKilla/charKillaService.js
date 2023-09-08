import apiUrls from "../../../apiUrls";
import { sifarishAPi } from "../../../apiHelpers";

export const charKilla = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.charKilla.getcharKilla.method,
    apiUrls.sifarish.charKilla.getcharKilla.url
  );
  return response;
};
export const insertCharKilla = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.charKilla.insertCharKilla.method,
    apiUrls.sifarish.charKilla.insertCharKilla.url,
    data
  );
  return response;
};

export const printCharKilla = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.charKilla.printCharKilla.method,
    apiUrls.sifarish.charKilla.printCharKilla.url + `?id=${id}`
  );
  return response;
};

export const CharKillaUpload = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.charKilla.charKillaFileUpload.method,
    apiUrls.sifarish.charKilla.charKillaFileUpload.url,
    data
  );
  return response;
};

export const getCharKillaUpload = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.charKilla.getCharKillaFileUpload.method,
    apiUrls.sifarish.charKilla.getCharKillaFileUpload.url + `?id=${id}`
  );
  return response;
};

export const charKillaFileUpdate = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.charKilla.charKillaFileUpdate.method,
    apiUrls.sifarish.charKilla.charKillaFileUpdate.url + `?id=${id}`
  );
  return response;
};
