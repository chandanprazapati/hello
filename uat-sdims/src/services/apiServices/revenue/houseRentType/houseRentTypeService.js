import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const houseRentType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.houseRentType.houseRentType.method,
    apiUrls.revenue.houseRentType.houseRentType.url,
  );
  return response
};
export const createHouseRentType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.houseRentType.createHouseRentType.method,
    apiUrls.revenue.houseRentType.createHouseRentType.url,
    data
  );
  return response;
};
