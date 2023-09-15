import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const insertBidut = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.bidut.insertBidut.method,
    apiUrls.sifarish.bidut.insertBidut.url,
    data
  );
  return response;
};

export const getBidut = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.bidut.getBidut.method,
    apiUrls.sifarish.bidut.getBidut.url
  );
  return response;
};
