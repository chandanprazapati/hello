import apiUrls from "../../../apiUrls";
import {complaintAPi } from "../../../apiHelpers";

export const complaintSensitivityService = async () => {
  let response = await complaintAPi(
    apiUrls.complaint.complaintSensitivity.complaintSensitivity.method,
    apiUrls.complaint.complaintSensitivity.complaintSensitivity.url,
  );
  return response
};
export const createComplaintSensitivityService = async (data) => {
  let response = await complaintAPi(
    apiUrls.complaint.complaintSensitivity.createComplaintSensitivity.method,
    apiUrls.complaint.complaintSensitivity.createComplaintSensitivity.url,
    data
  );
  return response;
};