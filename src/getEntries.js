import dotenv from "dotenv";
import { appAccessToken } from "./getAppAccessToken.js";
import contentful from "contentful-management";

// Init dotenv.
dotenv.config();

(async () => {
  // You must use the CMA Plain API in order to make calls using this generated token.
  // This is because the standard client library makes some assumptions about being able
  // to access Spaces or Environments directly before querying, whereas the Plain API
  // allows you to pass in some defaults first.
  // @see: https://contentful.github.io/contentful-management.js/contentful-management/10.35.3/#alternative-plain-api
  const plainClient = await contentful.createClient(
    {
      accessToken: appAccessToken,
    },
    {
      type: "plain",
      defaults: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID,
      },
    }
  );

  const entries = await plainClient.entry.getMany({
    query: {
      skip: 0,
      limit: 5,
    },
  });

  // Log out the entries to demonstrate that appAccessToken is working.
  console.log(entries);
})();
