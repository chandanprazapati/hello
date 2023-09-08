import apiUrls from "../../../apiUrls";
import { commonApi } from "../../../apiHelpers";

export const appointment = async () => {
  let response = await commonApi(
    apiUrls.common.appointment.appointment.method,
    apiUrls.common.appointment.appointment.url,
  );
  return response
};
export const createAppointment = async (data) => {
  let response = await commonApi(
    apiUrls.common.appointment.createAppointment.method,
    apiUrls.common.appointment.createAppointment.url,
    data
  );
  return response;
};