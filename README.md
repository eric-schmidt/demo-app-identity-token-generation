# App Identity Token Generation Demo

## Overview

**This is a proof of concept, and should not be considered production-ready in any shape or form.**

This repo demonstrates first how to obtain a Contentful CMA token via App Identity,
then how to use that token to retrieve a list of entries from Contentful.

`src/getAppAccessToken.js` shows how to use `@contentful/node-apps-toolkit`, along
with a properly generated Contentful App public/private key pair, to generate a
CMA token that is ready to use (expiring 10 minutes from when it was generated).

`src/getEntries.js` uses CMA calls to get data back from Contentful using the newly acquired token.
Note that this token can only be used for the following Contentful entities:
ContentType, EditorInterface, Entry, Asset, Locale, Tag, Task, and Snapshot. `src/getEntries`
coule easily be extended to test out any operations on the aforementioned entities as well.

Note: You must use the CMA Plain API in order to make calls using this generated token.
This is because the standard client library makes some assumptions about being able
to access Spaces or Environments directly before querying, whereas the Plain API
allows you to pass in some defaults first.
@see: https://contentful.github.io/contentful-management.js/contentful-management/10.35.3/#alternative-plain-api

## Instructions

1. Create a Contentful app, along with a public/private key pair, following [these instructions](https://www.contentful.com/developers/docs/extensibility/app-framework/app-identities-and-events/#creating-your-app-keys).
2. Install the app to whatever spaces/environments you would like to interact with.
3. Run `npm install` in this repo.
4. Place the private key generated in step 1 in `./keys/key.pem`.
5. Copy `.env.example`, rename to `.env`, and update the `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT_ID`, and `CONTENTFUL_APP_DEFINITION_ID` variables (the app definition ID can be found on your app's config page in the web app).
6. In your console run `node src/getEntries.js`, and you should see the rough output of 10 entries with no errors. You can also run `src/getAppAccessToken.js` directly to ensure it is working (uncomment line 18 to see a printout of the generated token).
