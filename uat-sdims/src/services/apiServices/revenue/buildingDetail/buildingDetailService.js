import apiUrls from "../../../apiUrls";
import { controllerApi } from "../../../apiHelpers";

export const buildingDetail = async () => {
  let response = await controllerApi(
    apiUrls.controller.buildingDetail.buildingDetail.method,
    apiUrls.controller.buildingDetail.buildingDetail.url
  );
  return response;
};
export const createBuildingDetail = async (data) => {
  let response = await controllerApi(
    apiUrls.controller.buildingDetail.createBuildingDetail.method,
    apiUrls.controller.buildingDetail.createBuildingDetail.url,
    data
  );
  return response;
};

