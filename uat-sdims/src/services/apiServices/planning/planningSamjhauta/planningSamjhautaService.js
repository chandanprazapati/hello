import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const planningSamjhauta = async () => {
  let response = await planningApi(
    apiUrls.planning.planningSamjhauta.planningSamjhauta.method,
    apiUrls.planning.planningSamjhauta.planningSamjhauta.url,
  );
  return response
};

export const planningSamjhautaById = async (id) => {
  let response = await planningApi(
    apiUrls.planning.planningSamjhauta.planningSamjhautaById.method,
    apiUrls.planning.planningSamjhauta.planningSamjhautaById.url + `${id}`,
  );
  return response
};

export const createPlanningSamjhauta = async (data) => {
  let response = await planningApi(
    apiUrls.planning.planningSamjhauta.createPlanningSamjhauta.method,
    apiUrls.planning.planningSamjhauta.createPlanningSamjhauta.url,
    data
  );
  return response;
};
export const deletePlanningSamjhauta = async (id) => {
    let response = await planningApi(
      apiUrls.planning.planningSamjhauta.deletePlanningSamjhauta.method,
      apiUrls.planning.planningSamjhauta.deletePlanningSamjhauta.url + `${id}`,
    );
    return response;
  };

  export const bhuktaniListBySamjhautaId = async (id) => {
    let response = await planningApi(
      apiUrls.planning.planningSamjhauta.bhuktaniListBySamjhautaId.method,
      apiUrls.planning.planningSamjhauta.bhuktaniListBySamjhautaId.url + `?planningSamjhautaId=${id}`,
    );
    return response;
  };
  export const createPlanningBhuktani = async (data) => {
    let response = await planningApi(
      apiUrls.planning.planningSamjhauta.createPlanningBhuktani.method,
      apiUrls.planning.planningSamjhauta.createPlanningBhuktani.url,
      data
    );
    return response;
  }