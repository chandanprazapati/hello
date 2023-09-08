import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertBasobas = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sthaiAsthaiBasobas.insertSthaiAsthaiBasobas.method,
    apiUrls.sifarish.sthaiAsthaiBasobas.insertSthaiAsthaiBasobas.url,
    data
  );
  return response;
};

export const getBasobas = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sthaiAsthaiBasobas.getSthaiAsthaiBasobas.method,
    apiUrls.sifarish.sthaiAsthaiBasobas.getSthaiAsthaiBasobas.url
  );
  return response;
};

export const printBasobas = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sthaiAsthaiBasobas.sthaiAsthaiBasobasPrint.method,
    apiUrls.sifarish.sthaiAsthaiBasobas.sthaiAsthaiBasobasPrint.url +
      `?id=${id}`
  );
  return response;
};

export const insertBasobasFile = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sthaiAsthaiBasobas.insertSthaiAsthaiBasobasFile.method,
    apiUrls.sifarish.sthaiAsthaiBasobas.insertSthaiAsthaiBasobasFile.url,
    data
  );
  return response;
};

export const getBasobasFile = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sthaiAsthaiBasobas.getSthaiAsthaiBasobasFile.method,
    apiUrls.sifarish.sthaiAsthaiBasobas.getSthaiAsthaiBasobasFile.url +
      `?id=${id}`
  );
  return response;
};

export const updateBasobas = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.sthaiAsthaiBasobas.sthaiAasthaiBasobasUpdate.method,
    apiUrls.sifarish.sthaiAsthaiBasobas.sthaiAasthaiBasobasUpdate.url +
      `?id=${id}`
  );
  return response;
};
