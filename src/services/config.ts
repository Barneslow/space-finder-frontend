const spacesUrl =
  "https://6r93kixotj.execute-api.us-east-1.amazonaws.com/prod/";

export const config = {
  REGION: "us-east-1",
  USER_POOL_ID: "us-east-1_LqCbF1yI5",
  APP_CLIENT_ID: "4614tecubb2k0bfgp9la0iar5n",
  IDENTITY_POOL_ID: "us-east-1:f96e68a1-b534-4e10-a362-edc4ee51af62",
  TEST_USER_NAME: "barneygumble",
  TEST_USER_PASSWORD: "rQ33saLLq,P",
  SPACES_PHOTOS_BUCKET: "spaces-photos-0e9417b18f9f",
  api: {
    baseUrl: spacesUrl,
    spacesUrl: `${spacesUrl}spaces`,
  },
};
