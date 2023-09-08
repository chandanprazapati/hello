import { legalCaseAPi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const postApi = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.post.post.method,
    apiUrls.legalCase.post.post.url
  );
  return response;
};
export const createPostApi = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.post.createPost.method,
    apiUrls.legalCase.post.createPost.url,
    data
  );
  return response;
};

export const yenKanunApi = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.yenKanun.yenKanun.method,
    apiUrls.legalCase.yenKanun.yenKanun.url
  );
  return response;
};

export const createYenKanunApi = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.yenKanun.createYenKanun.method,
    apiUrls.legalCase.yenKanun.createYenKanun.url,
    data
  );
  return response;
};

export const personDetailApi = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.personDetail.personDetail.method,
    apiUrls.legalCase.personDetail.personDetail.url
  );
  return response;
};

export const createPersonDetailApi = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.personDetail.createPersonDetail.method,
    apiUrls.legalCase.personDetail.createPersonDetail.url,
    data
  );
  return response;
};

export const getUjuriNibedanReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getUjuriNibedanReport.method,
    apiUrls.legalCase.report.getUjuriNibedanReport.url
  );
  return response;
};

export const getMisilAbhilekhReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getMisilAbhilekhReport.method,
    apiUrls.legalCase.report.getMisilAbhilekhReport.url
  );
  return response;
};

export const getRayKitabReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getRayKitabReport.method,
    apiUrls.legalCase.report.getRayKitabReport.url
  );
  return response;
};

export const getTarikKitabReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getTarikKitabReport.method,
    apiUrls.legalCase.report.getTarikKitabReport.url
  );
  return response;
};

export const getDartaListReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getDartaListReport.method,
    apiUrls.legalCase.report.getDartaListReport.url
  );
  return response;
};

export const getChalaniListReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getChalaniListReport.method,
    apiUrls.legalCase.report.getChalaniListReport.url
  );
  return response;
};

export const getGhatanakoBiwaranReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getGhatanakoBiwaranReport.method,
    apiUrls.legalCase.report.getGhatanakoBiwaranReport.url
  );
  return response;
};

export const getNibedanKoBiwaranReport = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.report.getNibedanKoBiwaranReport.method,
    apiUrls.legalCase.report.getNibedanKoBiwaranReport.url
  );
  return response;
};

export const getIndexCaseStage = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseStage.method,
    apiUrls.legalCase.indexCaseStage.url
  );
  return response;
};

export const createCase = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.createCase.method,
    apiUrls.legalCase.createCase.url,
    data
  );
  return response;
};

export const getIndexCase = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCase.method,
    apiUrls.legalCase.indexCase.url
  );
  return response;
};

export const editCase = async (id) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.editCase.method,
    apiUrls.legalCase.editCase.url + `?id=${id}`
  );
  return response;
};

export const indexCaseStatus = async (id) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseStatus.method,
    apiUrls.legalCase.indexCaseStatus.url + `?id=${id}`
  );
  return response;
};

export const getLegalAanusuchi = async (number1) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.getLegalAanusuchi.method,
    apiUrls.legalCase.getLegalAanusuchi.url + `?id=${number1}`
  );
  return response;
};

export const indexCaseMelMilap = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseMelMilap.method,
    apiUrls.legalCase.indexCaseMelMilap.url 
  );
  return response;
};

export const indexCaseWardMelMilap = async () =>{
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseWardMelMilap.method,
    apiUrls.legalCase.indexCaseWardMelMilap.url
  );
  return response;
}

export const indexCaseAapil = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.indexCaseAapil.method,
    apiUrls.legalCase.indexCaseAapil.url
  );
  return response;
};

export const likhitZawaf = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.likhitZawaf.method,
    apiUrls.legalCase.likhitZawaf.url,
    data
  );
  return response;
};

export const arkoTarik = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.arkoTarik.method,
    apiUrls.legalCase.arkoTarik.url,
    data
  );
  return response;
};

export const melMilap = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.mailMilap.method,
    apiUrls.legalCase.mailMilap.url,
    data
  );
  return response;
};

export const firtaAadesh = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.firtaAadesh.method,
    apiUrls.legalCase.firtaAadesh.url,
    data
  );
  return response;
};

export const wadaMelMilap = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.wadaMailMilap.method,
    apiUrls.legalCase.wadaMailMilap.url,
    data
  );
  return response;
};

export const completeCase = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.completeCase.method,
    apiUrls.legalCase.completeCase.url,
    data
  );
  return response;
};

export const punarabedan = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.punarebedan.method,
    apiUrls.legalCase.punarebedan.url,
    data
  );
  return response;
};


export const sanyojakSadasya = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.sanyojakSadasya.sanyojakSadasya.method,
    apiUrls.legalCase.sanyojakSadasya.sanyojakSadasya.url
  );
  return response;
};

export const createSanyojakSadasya = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.sanyojakSadasya.createSanyojakSadasya.method,
    apiUrls.legalCase.sanyojakSadasya.createSanyojakSadasya.url,
    data
  );
  return response;
};

export const sadasyaForMelMilap = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.sanyojakSadasya.sadasyaForMelMilap.method,
    apiUrls.legalCase.sanyojakSadasya.sadasyaForMelMilap.url
  );
  return response;
};


export const sanyojakForMelMilap = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.sanyojakSadasya.sanyojakForMelMilap.method,
    apiUrls.legalCase.sanyojakSadasya.sanyojakForMelMilap.url
  );
  return response;
};

export const legalDarta = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.legalDarta.legalDarta.method,
    apiUrls.legalCase.legalDarta.legalDarta.url
  );
  return response;
}

export const createLegalDarta = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.legalDarta.createLegalDarta.method,
    apiUrls.legalCase.legalDarta.createLegalDarta.url,
    data
  );
  return response;
}

export const legalChalani = async () => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.legalChalani.legalChalani.method,
    apiUrls.legalCase.legalChalani.legalChalani.url
  );
  return response;
}

export const createLegalChalani = async (data) => {
  let response = await legalCaseAPi(
    apiUrls.legalCase.legalChalani.createLegalChalani.method,
    apiUrls.legalCase.legalChalani.createLegalChalani.url,
    data
  );
  return response;
}