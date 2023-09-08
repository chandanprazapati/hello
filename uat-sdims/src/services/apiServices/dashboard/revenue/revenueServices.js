import apiUrls from "../../../apiUrls";
import { dashboardApi } from "../../../apiHelpers";
export const indexRevenue = async () => {
  let response = await dashboardApi(
    apiUrls.dashboard.revenue.indexDashboard.method,
    apiUrls.dashboard.revenue.indexDashboard.url,
  );
  return response
};

export const piechartData = async () => {
  let response = await dashboardApi(
    apiUrls.dashboard.revenue.piechartData.method,
    apiUrls.dashboard.revenue.piechartData.url,
  );
  return response
};

export const wadaChartData = async () => {
  let response = await dashboardApi(
    apiUrls.dashboard.revenue.wadaChartData.method,
    apiUrls.dashboard.revenue.wadaChartData.url,
  );
  return response
};