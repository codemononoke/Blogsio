const BASE_URL = "http://localhost:8800/api/v1";

export const authEndpoints = {
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  SIGNIN_API: `${BASE_URL}/auth/signin`,
};

export const settingEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`,
  UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
};
