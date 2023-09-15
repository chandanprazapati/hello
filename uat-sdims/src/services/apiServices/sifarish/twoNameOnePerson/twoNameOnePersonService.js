import { sifarishAPi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const getTwonameOnePerson = async () => {
  let response = await sifarishAPi(
    apiUrls.sifarish.twoNameOnePerson.getTwoNamePerson.method,
    apiUrls.sifarish.twoNameOnePerson.getTwoNamePerson.url
  );
  return response;
};

export const insertTwonameOnePerson = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.twoNameOnePerson.insertTwoNamePerson.method,
    apiUrls.sifarish.twoNameOnePerson.insertTwoNamePerson.url,
    data
  );
  return response;
};

export const twoNameOnePersonDetailsUpdate = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.twoNameOnePerson.updateTwoNameOnePerson.method,
    apiUrls.sifarish.twoNameOnePerson.updateTwoNameOnePerson.url + `?id=${id}`
  );
  return response;
};

export const insertDocsTwonameOnePerson = async (data) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.twoNameOnePerson.insertDocsTwoNameOnePerson.method,
    apiUrls.sifarish.twoNameOnePerson.insertDocsTwoNameOnePerson.url,
    data
  );
  return response;
};

export const getDocsTwoNameOnePerson = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.twoNameOnePerson.getDocsTwoNameOnePerson.method,
    apiUrls.sifarish.twoNameOnePerson.getDocsTwoNameOnePerson.url + `?id=${id}`
  );
  return response;
};

export const twoNameOnePersonPrintData = async (id) => {
  let response = await sifarishAPi(
    apiUrls.sifarish.twoNameOnePerson.printTwoNameOnePerson.method,
    apiUrls.sifarish.twoNameOnePerson.printTwoNameOnePerson.url + `?id=${id}`
  );
  return response;
};
