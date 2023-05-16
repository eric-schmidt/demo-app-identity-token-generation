import dotenv from "dotenv";
import { appAccessToken } from "./getAppAccessToken.js";
import fetch from "node-fetch";

// Init dotenv.
dotenv.config();

(async () => {
  // Use direct CMA calls to get data back from Contentful using newly acquired token.
  // Note that this token can only be used for the following Contentful entities:
  // ContentType, EditorInterface, Entry, Asset, Locale, Tag, Task, and Snapshot.
  //
  // Additionally, as App Identity tokens are scoped differently than personal access tokens
  // (e.g you cannot access Spaces or Environment directly), you will not be able to use
  // client libraries to make these calls, since they typically require getSpace or
  // getEnvironment to be called before you can return any data or perform any operations.
  const entries = await fetch(
    `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appAccessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  // Log out list of entries to prove that App Identity token is working properly.
  console.log(entries);
})();
