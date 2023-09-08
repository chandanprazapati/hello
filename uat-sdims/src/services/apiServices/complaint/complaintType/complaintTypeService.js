import apiUrls from "../../../apiUrls";
import {complaintAPi } from "../../../apiHelpers";

export const complaintTypeService = async () => {
  let response = await complaintAPi(
    apiUrls.complaint.complaintType.complaintType.method,
    apiUrls.complaint.complaintType.complaintType.url,
  );
  return response
};
export const createComplaintTypeService = async (data) => {
  let response = await complaintAPi(
    apiUrls.complaint.complaintType.createcomplaintType.method,
    apiUrls.complaint.complaintType.createcomplaintType.url,
    data
  );
  return response;
};