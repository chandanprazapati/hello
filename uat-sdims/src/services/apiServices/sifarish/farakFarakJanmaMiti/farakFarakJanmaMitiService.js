import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertFaraJanmakMiti = async (data) => {
  let response = sifarishAPi(
    apiUrls.sifarish.farakFarakJanmaMiti.insertFarakMiti.method,
    apiUrls.sifarish.farakFarakJanmaMiti.insertFarakMiti.url,
    data
  );
  return response;
};

export const getFaraJanmakMiti = async () => {
  let response = sifarishAPi(
    apiUrls.sifarish.farakFarakJanmaMiti.getFarakMiti.method,
    apiUrls.sifarish.farakFarakJanmaMiti.getFarakMiti.url
  );
  return response;
};

export const updateFarakJanmaMitiData = async (id) => {
  let response = sifarishAPi(
    apiUrls.sifarish.farakFarakJanmaMiti.updateFarakMitiData.method,
    apiUrls.sifarish.farakFarakJanmaMiti.updateFarakMitiData.url + `?id=${id}`
  );
  return response;
};

export const uploadDocsFarakJanmaMitiData = async (data) => {
  let response = sifarishAPi(
    apiUrls.sifarish.farakFarakJanmaMiti.uploadDocsFarakJanmMiti.method,
    apiUrls.sifarish.farakFarakJanmaMiti.uploadDocsFarakJanmMiti.url,
    data
  );
  return response;
};

export const getDocsFarakJanmaMitiData = async (id) => {
  let response = sifarishAPi(
    apiUrls.sifarish.farakFarakJanmaMiti.getDocsFarakJanmMiti.method,
    apiUrls.sifarish.farakFarakJanmaMiti.getDocsFarakJanmMiti.url + `?id=${id}`
  );
  return response;
};

export const printFarakJanmaMitiData = async (id) => {
  let response = sifarishAPi(
    apiUrls.sifarish.farakFarakJanmaMiti.printFarakJanmaMiti.method,
    apiUrls.sifarish.farakFarakJanmaMiti.printFarakJanmaMiti.url + `?id=${id}`
  );
  return response;
};
