import apiUrls from "../../../apiUrls";
import {complaintAPi } from "../../../apiHelpers";

export const complaintDetailsService = async () => {
  let response = await complaintAPi(
    apiUrls.complaint.complaintDetails.complaintDetails.method,
    apiUrls.complaint.complaintDetails.complaintDetails.url,
  );
  return response
};
export const createComplaintDetailsService = async (data) => {
  let response = await complaintAPi(
    apiUrls.complaint.complaintDetails.createcomplaintDetails.method,
    apiUrls.complaint.complaintDetails.createcomplaintDetails.url,
    data
  );
  return response;
};