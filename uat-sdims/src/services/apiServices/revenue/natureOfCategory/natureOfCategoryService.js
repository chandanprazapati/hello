import { revenueApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const natureOfCategory = async () => {
    let response = await revenueApi(
      apiUrls.revenue.natureOfCategory.natureOfCategory.method,
      apiUrls.revenue.natureOfCategory.natureOfCategory.url,
    );
    return response
  };