import apiUrls from "../../../apiUrls";
import { controllerApi } from "../../../apiHelpers";

export const houseRentDetail = async () => {
  let response = await controllerApi(
    apiUrls.controller.houseRentDetail.houseRentDetail.method,
    apiUrls.controller.houseRentDetail.houseRentDetail.url
  );
  return response;
};
export const createHouseRentDetail = async (data) => {
  let response = await controllerApi(
    apiUrls.controller.houseRentDetail.createHouseRentDetail.method,
    apiUrls.controller.houseRentDetail.createHouseRentDetail.url,
    data
  );
  return response;
};

