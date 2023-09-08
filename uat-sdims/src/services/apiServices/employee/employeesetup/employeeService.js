import { employeeApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const employee = async () => {
  let response = await employeeApi(
    apiUrls.employee.employee.employee.method,
    apiUrls.employee.employee.employee.url,
  );
  return response
};
export const createEmployee = async (data) => {
  let response = await employeeApi(
    apiUrls.employee.employee.createEmployee.method,
    apiUrls.employee.employee.createEmployee.url,
    data
  );
  return response;
};

export const employeeGetById = async (id) => {
  let response = await employeeApi(
    apiUrls.employee.employee.editEmployee.method,
    apiUrls.employee.employee.editEmployee.url +`${id}`,
  );
  return response
};
