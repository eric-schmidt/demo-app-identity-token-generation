import dotenv from "dotenv";
import { readFile } from "fs/promises";
import { getManagementToken } from "@contentful/node-apps-toolkit";

// Init dotenv.
dotenv.config();

// Read private key from file.
const privateKey = await readFile("./keys/key.pem", "utf8");

// Generate a CMA access token for a specific app + key private key.
export const appAccessToken = await getManagementToken(privateKey, {
  appInstallationId: process.env.CONTENTFUL_APP_DEFINITION_ID,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID,
});

// console.log(`App Access Token: ${appAccessToken}`);
