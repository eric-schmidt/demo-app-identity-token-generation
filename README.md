# App Identity Token Generation Demo

## Overview

**This is a proof of concept, and should not be considered production-ready in any shape or form.**

This repo demonstrates first how to obtain a Contentful CMA token via App Identity,
then how to use that token to programamtically create a couple entries in Contentful.

`src/createEntries.js` shows how to use `@contentful/node-apps-toolkit`, along
with a properly generated Contentful App public/private key pair, to generate a
CMA token that is ready to use (expiring 10 minutes from when it was generated).

`src/createEntries.js` then uses CMA calls to create entries in Contentful using the newly acquired token.
Note that this token can only be used for the following Contentful entities:
ContentType, EditorInterface, Entry, Asset, Locale, Tag, Task, and Snapshot. `src/createEntries.js`
could easily be extended to test out any operations on the aforementioned entities as well.

**Note: You must use the CMA Plain API in order to make calls using this generated token.
This is because the standard client library makes some assumptions about being able
to access Spaces or Environments directly before querying, whereas the Plain API
allows you to pass in some defaults first.
See the [CMA Plain API docs](https://contentful.github.io/contentful-management.js/contentful-management/10.35.3/#alternative-plain-api).**

## Instructions

1. In blank space, import the content model using `contentful space import --space-id [YOUR SPACE ID] --environment-id [YOUR ENVIRONMENT ID] --content-file ./data/content-model.json`.
2. Create a Contentful app, along with a public/private key pair, following [these instructions](https://www.contentful.com/developers/docs/extensibility/app-framework/app-identities-and-events/#creating-your-app-keys).
3. Place the private key generated in step 2 in `./keys/key.pem`.
4. Install the app for the space/environment for which you imported the content model above.
5. Run `npm install` in this repo.
6. Copy `.env.example`, rename to `.env`, and update the `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT_ID`, and `CONTENTFUL_APP_DEFINITION_ID` variables (the app definition ID can be found on your app's config page in the web app).
7. In your console run `node src/createEntries.js`, and you should see the terminal output for 5 entries being created with no errors.
