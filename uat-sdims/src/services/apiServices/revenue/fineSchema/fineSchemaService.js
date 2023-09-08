import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const fineSchema = async () => {
  let response = await revenueApi(
    apiUrls.revenue.fineSchema.fineSchema.method,
    apiUrls.revenue.fineSchema.fineSchema.url,
  );
  return response
};
export const createFineSchema = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.fineSchema.createFineSchema.method,
    apiUrls.revenue.fineSchema.createFineSchema.url,
    data
  );
  return response;
};
