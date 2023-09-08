import { store } from "@/redux/store";
import axios from "axios";

// const baseUrl = "https://sdims.meropalika.com/api";
const baseUrl = "http://192.168.1.100:100/api";
// const imageUrl = "http://192.168.1.100:100"
export const urls = {
  commonUrl: `${baseUrl}/Admin/Common`,
  planningUrl: `${baseUrl}/Planning`,
  revenueUrl: `${baseUrl}/revenue/common`,
  controllerUrl: `${baseUrl}/Revenue`,
  employeeUrl: `${baseUrl}/Admin/Employee`,
  transcationUrl: `${baseUrl}/Revenue/Transection`,
  pisUrl: `${baseUrl}/PIS/EmployeePreviousOfficeRecord`,
  talimUrl: `${baseUrl}/PIS/TalimModule`,
  sewalogUrl: `${baseUrl}/PIS/SewaLog`,
  pisCommonUrl: `${baseUrl}/PIS/PisCommon`,
  sifarishUrl: `${baseUrl}/Sifarish`,
  complaintUrl: `${baseUrl}/ComplaintManagement`,
  dashboardUrl: `${baseUrl}/Dashboard/Dashboard`,
  attendanceUrl: `${baseUrl}/Attendance/AttReport`,
  leagalCaseUrl: `${baseUrl}/LegalCase`,
};

export const authApi = async (method, url, data) => {
  let response = await axios({
    method,
    url: `${baseUrl}${url}`,
    data,
  });
  return response.data;
};
export const commonApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.commonUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const dashboardApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.dashboardUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const planningApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.planningUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};
export const revenueApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.revenueUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};
export const authenticatedApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.commonUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const controllerApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.controllerUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};
export const employeeApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.employeeUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};
export const transactionApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.transcationUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const pisApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.pisUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const talimModuleApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.talimUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const sewalogApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.sewalogUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const pisCommonApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.pisCommonUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const complaintAPi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.complaintUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const sifarishAPi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.sifarishUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const attendanceApi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${attendanceUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const legalCaseAPi = async (method, url, data) => {
  const tok = store.getState();
  let response = await axios({
    method,
    url: `${urls.leagalCaseUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

// export const legalCaseAPi = async (method, url, data, headers = {}) => {
//   const tok = store.getState();
//   const defaultHeaders = {
//     Authorization: `Bearer ${tok.userDetail.user?.data?.token}`,
//     ...headers, // Include any additional headers passed as a parameter
//   };

//   // Add "content-type": "multipart/form-data" to the default headers
//   const headersWithMultipart = {
//     ...defaultHeaders,
//     "content-type": "multipart/form-data",
//   };

//   let response = await axios({
//     method,
//     url: `${urls.leagalCaseUrl}${url}`,
//     data,
//     headers: headersWithMultipart,
//   });

//   return response.data;
// };
