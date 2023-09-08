import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const businessOwnershipType = async () => {
  let response = await revenueApi(
    apiUrls.revenue.businessOwnershipType.businessOwnershipType.method,
    apiUrls.revenue.businessOwnershipType.businessOwnershipType.url,
  );
  return response
};
export const createBusinessOwnershipType = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.businessOwnershipType.createBusinessOwnershiptype.method,
    apiUrls.revenue.businessOwnershipType.createBusinessOwnershiptype.url,
    data
  );
  return response;
};
