I am looking to extend this AWeber API wrapper to include Custom Fields 

API documentation: https://api.aweber.com/#tag/Custom-Fields

Before starting the work you should create a branch `customFields` and ensure all development happens on that feature branch.

You should use `src/aweber/broadcasts/*` as a template

1. Create a new folder `src/aweber/customFields` for the new files
2. Create the `src/aweber/customFields/customFields.mocks.ts` using the same data shown in the API documentation 
3. Create the `src/aweber/customFields/customFields.types.ts` using the response entities from the API documentation
4. Create the `src/aweber/customFields/customFields.dtos.ts` using the API request Query/Body data from the API documentation
5. Create the `src/aweber/customFields/customFields.service.ts` creating the actions for each endpoint in the API documentation, using the mocks, types, dtos etc. Note that we are returning just the entitie array when collections are returned
6. Create the `src/aweber/customFields/customFields.module.ts` for bringing everything together.
7. Create the `src/aweber/customFields/customFields.test.spec.ts` creating tests for each of the functions in the customFields.service.ts file, ensure the tests pass successfully.
8. Include the new `customFields.module` in the main `src/aweber/aweber.module.ts` file as an import
9. Add the new `customFields` model, service, types and DTOs as exports to the main `src/index.ts` file
10. Run lint and fix any linting issues
11. Run prettier 
12. Run build and make sure the application builds
13. Run the test suite to ensure tests still pass.
14. Create a PR for this new module from your feature branch to main.