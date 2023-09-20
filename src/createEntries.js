import dotenv from "dotenv";
import contentful from "contentful-management";
import { readFile } from "fs/promises";
import { getManagementToken } from "@contentful/node-apps-toolkit";
import chalk from "chalk";

// Init dotenv.
dotenv.config();

(async () => {
  // Read private key from file.
  const privateKey = await readFile("./keys/key.pem", "utf8");

  // Parse source data for content to migrate into Contentful.
  const sourceData = await readFile("./data/content.json", "utf8");
  const parsedJSON = await JSON.parse(sourceData);

  // For each item found, instantiate a new client using a fresh token.
  // getManagementToken should use a cached version of the token while valid,
  // so re-instantiating the client for each item in the loop will ensure we don't
  // end up working with an expired token during long operations.
  parsedJSON.items.forEach(async (item) => {
    // You must use the CMA Plain API in order to make calls using this generated token.
    // This is because the standard client library makes some assumptions about being able
    // to access Spaces or Environments directly before querying, whereas the Plain API
    // allows you to pass in some defaults first.
    // @see: https://contentful.github.io/contentful-management.js/contentful-management/10.35.3/#alternative-plain-api
    const plainClient = await contentful.createClient(
      {
        accessToken: await getManagementToken(privateKey, {
          appInstallationId: process.env.CONTENTFUL_APP_DEFINITION_ID,
          spaceId: process.env.CONTENTFUL_SPACE_ID,
          environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID,
          // get the cached key if not expired (keys are valid for 10 minutes).
          reuseToken: true,
        }),
      },
      {
        type: "plain",
        defaults: {
          spaceId: process.env.CONTENTFUL_SPACE_ID,
          environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID,
        },
      }
    );

    // Create and publish the entry.
    plainClient.entry
      .create(
        { contentTypeId: "article" },
        {
          fields: {
            title: {
              "en-US": item.title,
            },
          },
        }
      )
      .then((entry) => {
        plainClient.entry
          .publish(
            {
              entryId: entry.sys.id,
            },
            entry
          )
          .then((entry) => {
            console.log(
              chalk.green(
                `Entry created: https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries/${entry.sys.id}`
              )
            );
          });
      });
  });
})();
