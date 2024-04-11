export const DEV_MODE = process.env.NODE_ENV === "development";

const credentials = {
  local: {
    baseUrl: "https://5105-78-152-169-208.ngrok-free.app", // run `yarn ngrok`, for start proxy to local server in docker container
    id: "app",
    secret: "secret",
  },
  stage: {
    baseUrl: "https://stage.service.shchodnia.com",
    id: "d376781f898b8f8b677e4acaa773cf48",
    secret:
      "4620367240b6c29baae6ceb782341e279dcebafcbb1179e5fa12c0f4d339d86f34ce73d37c0e684bd292105d45fc11d215754826ab443402b6e51a7fbe970d96",
  },
  production: {
    baseUrl: "https://service.shchodnia.com",
    id: "8366349fc7c3da42ed2a15a5a480f568",
    secret:
      "346eaf962b36ca5f7bf815b0b6eb96417006e826b770863a03c8135c4732e5d75ff519eeba8cbbd86a7820fed8ac920d7156dc46d04011012f3210a480b46f17",
  },
};

export const BASE_URL =  "https://service.shchodnia.com/api/v2"

export const CLIENT_ID = false ? "app" : credentials.production.id;
export const CLIENT_SECRET = false ? "secret" : credentials.production.secret;

/// credentials client_id & client_secret
/// LOCALHOST
// app
// secret

///STAGE
// d376781f898b8f8b677e4acaa773cf48
// 4620367240b6c29baae6ceb782341e279dcebafcbb1179e5fa12c0f4d339d86f34ce73d37c0e684bd292105d45fc11d215754826ab443402b6e51a7fbe970d96

/// PROD
// client 8366349fc7c3da42ed2a15a5a480f568
// secret 346eaf962b36ca5f7bf815b0b6eb96417006e826b770863a03c8135c4732e5d75ff519eeba8cbbd86a7820fed8ac920d7156dc46d04011012f3210a480b46f17
