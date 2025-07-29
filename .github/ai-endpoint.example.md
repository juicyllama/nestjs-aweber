I am looking to extend this AWeber API wrapper to include Campaigns 

API documentation: https://api.aweber.com/#tag/Campaigns

Before starting the work you should create a branch `campaigns` and ensure all development happens on that feature branch.

You should use `src/aweber/broadcasts/*` as a template

1. Create a new folder `src/aweber/campaigns` for the new files
2. Create the `src/aweber/campaigns/campaigns.mocks.ts` using the same data shown in the API documentation 
3. Create the `src/aweber/campaigns/campaigns.types.ts` using the response entities from the API documentation
4. Create the `src/aweber/campaigns/campaigns.dtos.ts` using the API request Query/Body data from the API documentation
5. Create the `src/aweber/campaigns/campaigns.service.ts` creating the actions for each endpoint in the API documentation, using the mocks, types, dtos etc.
6. Create the `src/aweber/campaigns/campaigns.module.ts` for bringing everything together.
7. Create the `src/aweber/campaigns/campaigns.test.spec.ts` creating tests for each of the functions in the campaigns.service.ts file, ensure the tests pass successfully.
8. Include the new `campaigns.module` in the main `src/aweber/aweber.module.ts` file as an import
9. Add the new `campaigns` model, service, types and DTOs as exports to the main `src/index.ts` file
10. Run lint and fix any linting issues
11. Run prettier 
12. Run build and make sure the application builds
13. Run the test suite to ensure tests still pass.
14. Create a PR for this new module from your feature branch to main.