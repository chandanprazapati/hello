import apiUrls from "../../../apiUrls";
import { dashboardApi } from "../../../apiHelpers";
export const indexPlanning = async () => {
  let response = await dashboardApi(
    apiUrls.dashboard.planning.indexDashboard.method,
    apiUrls.dashboard.planning.indexDashboard.url,
  );
  return response
};

export const piechartData = async () => {
  let response = await dashboardApi(
    apiUrls.dashboard.planning.piechartData.method,
    apiUrls.dashboard.planning.piechartData.url,
  );
  return response
};

export const planningWadaChartData = async () => {
  let response = await dashboardApi(
    apiUrls.dashboard.planning.wadaChartData.method,
    apiUrls.dashboard.planning.wadaChartData.url,
  );
  return response
};