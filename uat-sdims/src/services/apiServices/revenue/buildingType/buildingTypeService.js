import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const buildingType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.buildingType.buildingType.method,
    apiUrls.revenue.buildingType.buildingType.url,
  );
  return response
};
export const createBuildingType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.buildingType.createBuildingType.method,
    apiUrls.revenue.buildingType.createBuildingType.url,
    data
  );
  return response;
};
