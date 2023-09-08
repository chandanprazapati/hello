import apiUrls from "../../../apiUrls";
import { controllerApi } from "../../../apiHelpers";

export const vehicleDetail = async () => {
  let response = await controllerApi(
    apiUrls.controller.vehicleDetail.vehicleDetail.method,
    apiUrls.controller.vehicleDetail.vehicleDetail.url
  );
  return response;
};
export const createVehicleDetail = async (data) => {
  let response = await controllerApi(
    apiUrls.controller.vehicleDetail.createVehicleDetail.method,
    apiUrls.controller.vehicleDetail.createVehicleDetail.url,
    data
  );
  return response;
};

