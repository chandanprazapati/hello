import { authApi } from "@/services/apiHelpers";
import apiUrls from "@/services/apiUrls";

// logging in user provided correct credintials
export const loginUser = async (data) => {
  let response = await authApi(
    apiUrls.auth.loginUser.method,
    apiUrls.auth.loginUser.url,
    data
  );
  return response;
};
