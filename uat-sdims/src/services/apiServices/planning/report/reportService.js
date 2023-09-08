import { planningApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const getPrativedanReport = async (id) => {
  let response = await planningApi(
    apiUrls.planning.report.getPrativedanReport.method,
    apiUrls.planning.report.getPrativedanReport.url + `?yojanaId=${id}`
  );
  return response;
};

export const samjhautaGaripau = async () => {
  let response = await planningApi(
    apiUrls.planning.report.samjhautaGaripau.method,
    apiUrls.planning.report.samjhautaGaripau.url
  );
  return response;
};

export const getSamjhautaGaripauReport = async (number) => {
  let response = await planningApi(
    apiUrls.planning.report.getSamjhautaGaripauReport.method,
    apiUrls.planning.report.getSamjhautaGaripauReport.url + `?id=${number}`
  );
  return response;
};

export const getSamjhautaGaridineReport = async (id) => {
  let response = await planningApi(
    apiUrls.planning.report.getSamjhautaGaridineReport.method,
    apiUrls.planning.report.getSamjhautaGaridineReport.url + `?yojanaId=${id}`
  );
  return response;
};

export const getSamjhautaFarfarakReport = async (id) => {
  let response = await planningApi(
    apiUrls.planning.report.getFarFarakReport.method,
    apiUrls.planning.report.getFarFarakReport.url + `?id=${id}`
  );
  return response;
};

export const getSamjhautaReport = async (number1,number2,number3) => {
  let response = await planningApi(
    apiUrls.planning.report.getSamjhautaReportSearched.method,
    apiUrls.planning.report.getSamjhautaReportSearched.url + `?fiscalYearid=${number1}&yojanaId=${number2}&empId=${number3}`
  );
  return response;
}

export const getSamjhutaSelectedReport = async (number1,string,number2) => {
  let response = await planningApi(
    apiUrls.planning.report.getPlanningSelectedReport.method,
    apiUrls.planning.report.getPlanningSelectedReport.url + `?fiscalYearid=${number1}&projectName=${string}&budgetSourceId=${number2}`
  );
  return response;
}

export const getSamjhautaCompletedReport = async(number1,string,number2) => {
  let response = await planningApi(
    apiUrls.planning.report.getPlanningCompletedReport.method,
    apiUrls.planning.report.getPlanningCompletedReport.url + `?fiscalYearid=${number1}&projectName=${string}&budgetSourceId=${number2}`
  );
  return response;
}

export const getWadaRelatedReport = async(number1,number2) => {
let response = await planningApi(
  apiUrls.planning.report.getPlanningWadaRelatedReport.method,
  apiUrls.planning.report.getPlanningWadaRelatedReport.url + `?fiscalId=${number1}&wardId=${number2}`
);
return response;
}

export const getPragatiPratibedanAnusuchi1Report = async() => {
  let response = await planningApi(
    apiUrls.planning.report.getPragatiPratibedanAnusuchi1.method,
    apiUrls.planning.report.getPragatiPratibedanAnusuchi1.url
  );
  return response;
}

