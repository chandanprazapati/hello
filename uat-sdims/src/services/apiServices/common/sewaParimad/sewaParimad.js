import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const sewaParimad = async () => {
  let response = await commonApi(
    apiUrls.common.sewaParimad.sewaParimad.method,
    apiUrls.common.sewaParimad.sewaParimad.url,
  );
  return response
};
export const createSewaParimad = async (data) => {
  let response = await commonApi(
    apiUrls.common.sewaParimad.createSewaParimad.method,
    apiUrls.common.sewaParimad.createSewaParimad.url,
    data
  );
  return response;
};


