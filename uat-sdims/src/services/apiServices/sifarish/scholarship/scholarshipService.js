import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertScholarship = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.scholarship.insertScholarship.method,
    apiUrls.sifarish.scholarship.insertScholarship.url,
    data
  );
  return response;
};

export const getScholarship = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.scholarship.getScholarship.method,
    apiUrls.sifarish.scholarship.getScholarship.url
  );
  return response;
};
