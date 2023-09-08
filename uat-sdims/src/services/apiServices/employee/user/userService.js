import { employeeApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const role = async () => {
  let response = await employeeApi(
    apiUrls.employee.user.role.method,
    apiUrls.employee.user.role.url
  );
  return response;
};
export const employeeForRegisterUser = async () => {
  let response = await employeeApi(
    apiUrls.employee.user.employeeForRegisterUser.method,
    apiUrls.employee.user.employeeForRegisterUser.url
  );
  return response;
};

export const getAllUser = async () => {
  let response = await employeeApi(
    apiUrls.employee.user.getAllUser.method,
    apiUrls.employee.user.getAllUser.url
  );
  return response;
};

export const registerUser = async (data) => {
  let response = await employeeApi(
    apiUrls.employee.user.registerUser.method,
    apiUrls.employee.user.registerUser.url,
    data
  );
  return response;
};

export const activeDeactiveUser = async (id) => {
    let response = await employeeApi(
        apiUrls.employee.user.activeDeactiveUser.method,
        apiUrls.employee.user.activeDeactiveUser.url + id
    );
    return response;
    }
