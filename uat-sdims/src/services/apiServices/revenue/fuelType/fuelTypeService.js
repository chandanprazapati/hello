import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const fuelType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.fuelType.fuelType.method,
    apiUrls.revenue.fuelType.fuelType.url,
  );
  return response
};
export const createFuelType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.fuelType.createFuelType.method,
    apiUrls.revenue.fuelType.createFuelType.url,
    data
  );
  return response;
};
