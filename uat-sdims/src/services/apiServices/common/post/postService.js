import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const post = async () => {
  let response = await commonApi(
    apiUrls.common.post.post.method,
    apiUrls.common.post.post.url,
  );
  return response
};
export const createPost = async (data) => {
  let response = await commonApi(
    apiUrls.common.post.createPost.method,
    apiUrls.common.post.createPost.url,
    data
  );
  return response;
};


