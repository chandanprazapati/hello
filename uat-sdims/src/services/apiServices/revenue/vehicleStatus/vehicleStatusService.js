import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const vehicleStatus = async () => {
  let response = await revenueApi(
    apiUrls.revenue.vehicleStatus.vehicleStatus.method,
    apiUrls.revenue.vehicleStatus.vehicleStatus.url,
  );
  return response
};
export const createVehicleStatus = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.vehicleStatus.createVehicleStatus.method,
    apiUrls.revenue.vehicleStatus.createVehicleStatus.url,
    data
  );
  return response;
};
