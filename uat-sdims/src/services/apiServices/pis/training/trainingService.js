import apiUrls from "../../../apiUrls";
import {  pisApi } from "../../../apiHelpers";

export const trainingRecord = async () => {
  let response = await pisApi(
    apiUrls.pis.trainingRecord.trainingRecord.method,
    apiUrls.pis.trainingRecord.trainingRecord.url,
  );
  return response
};
export const CreateTrainingRecord = async (data) => {
  let response = await pisApi(
    apiUrls.pis.trainingRecord.createTrainingRecord.method,
    apiUrls.pis.trainingRecord.createTrainingRecord.url,
    data
  );
  return response;
};