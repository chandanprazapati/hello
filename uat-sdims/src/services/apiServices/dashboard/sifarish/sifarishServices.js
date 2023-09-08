import apiUrls from "../../../apiUrls";
import { dashboardApi } from "../../../apiHelpers";
export const indexSifarish = async () => {
  let response = await dashboardApi(
    apiUrls.dashboard.sifarish.indexDashboard.method,
    apiUrls.dashboard.sifarish.indexDashboard.url,
  );
  return response
};

