import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const vehicleType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.vehicleType.vehicleType.method,
    apiUrls.revenue.vehicleType.vehicleType.url,
  );
  return response
};
export const createVehicleType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.vehicleType.createVehicleType.method,
    apiUrls.revenue.vehicleType.createVehicleType.url,
    data
  );
  return response;
};
