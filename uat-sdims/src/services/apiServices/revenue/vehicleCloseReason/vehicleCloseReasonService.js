import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const vehicleCloseReason = async () => {
  let response = await revenueApi(
    apiUrls.revenue.vehicleCloseReason.vehicleCloseReason.method,
    apiUrls.revenue.vehicleCloseReason.vehicleCloseReason.url,
  );
  return response
};
export const createVehicleCloseReason = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.vehicleCloseReason.createVehicleCloseReason.method,
    apiUrls.revenue.vehicleCloseReason.createVehicleCloseReason.url,
    data
  );
  return response;
};
