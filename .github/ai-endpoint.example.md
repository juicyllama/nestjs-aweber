I am looking to extend this AWeber API wrapper to include Landing Pages 

API documentation: https://api.aweber.com/#tag/Landing-Pages

Before starting the work you should create a branch `landing-pages` and ensure all development happens on that feature branch.

You should use `src/aweber/broadcasts/*` as a template

1. Create a new folder `src/aweber/landingPages` for the new files
2. Create the `src/aweber/landingPages/landingPages.mocks.ts` using the same data shown in the API documentation 
3. Create the `src/aweber/landingPages/landingPages.types.ts` using the response entities from the API documentation
4. Create the `src/aweber/landingPages/landingPages.dtos.ts` using the API request Query/Body data from the API documentation
5. Create the `src/aweber/landingPages/landingPages.service.ts` creating the actions for each endpoint in the API documentation, using the mocks, types, dtos etc. Note that we are returning just the entitie array when collections are returned
6. Create the `src/aweber/landingPages/landingPages.module.ts` for bringing everything together.
7. Create the `src/aweber/landingPages/landingPages.test.spec.ts` creating tests for each of the functions in the landingPages.service.ts file, ensure the tests pass successfully.
8. Include the new `landingPages.module` in the main `src/aweber/aweber.module.ts` file as an import
9. Add the new `landingPages` model, service, types and DTOs as exports to the main `src/index.ts` file
10. Run lint and fix any linting issues
11. Run prettier 
12. Run build and make sure the application builds
13. Run the test suite to ensure tests still pass.
14. Create a PR for this new module from your feature branch to main.