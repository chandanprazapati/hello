import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const office = async () => {
  let response = await commonApi(
    apiUrls.common.office.office.method,
    apiUrls.common.office.office.url
  );
  return response;
};
export const createOffice = async (data) => {
  let response = await commonApi(
    apiUrls.common.office.createOffice.method,
    apiUrls.common.office.createOffice.url,
    data
  );
  return response;
};

export const getAllState = async () => {
  let response = await commonApi(
    apiUrls.common.office.state.method,
    apiUrls.common.office.state.url
  );
  return response;
};
export const getDistrict = async (id) => {
  let response = await commonApi(
    apiUrls.common.office.getDistrictById.method,
    apiUrls.common.office.getDistrictById.url + (id | 0)
  );
  return response;
};
export const getPalika = async (id) => {
  let response = await commonApi(
    apiUrls.common.office.getPalikaById.method,
    apiUrls.common.office.getPalikaById.url + (id | 0)
  );
  return response;
};
export const GetAllNationality = async (id) => {
  let response = await commonApi(
    apiUrls.common.office.GetAllNationality.method,
    apiUrls.common.office.GetAllNationality.url
  );
  return response;
};

