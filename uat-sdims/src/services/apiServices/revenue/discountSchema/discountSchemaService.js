import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const discountSchema = async () => {
  let response = await revenueApi(
    apiUrls.revenue.discountSchema.discountSchema.method,
    apiUrls.revenue.discountSchema.discountSchema.url,
  );
  return response
};
export const createDiscountSchema = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.discountSchema.createDiscountSchema.method,
    apiUrls.revenue.discountSchema.createDiscountSchema.url,
    data
  );
  return response;
};
