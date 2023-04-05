# Tech test notes:

Issues with codesandbox:
- Tests that pass locally, dont pass on codesandbox
- i.e. expect(...).XYZ is not a function, where XYZ is the underlying issue. For example .toBeInTheDocument
- i.e. focuses on the body element when it should focus on another correct element e.g input. I suspect lines 12, 16 and 19 on Modal.jsx where I invoke document.body.style.overflow is the issue at play. 

If I had more time I would:
- utilise typescript 
- implement the modal using react portal
- describe aria attributes with more informative values 
- better styling overall
- replace more px styled elements
- functional form
- incorporate media in the modal 
- more thorough testing
- fix build errors

TypeScript:
Can potentially fix type errors for tests 

React Portal: 
Would implement react portal as per the docs, portal has some desired behaviour over a div modal component as it renders the elements outside the React hierarchy tree without comprising the parent-child relationship between components. I realised that I could of use this after implementing the solution and tests, due to time constraints I didnt implement a react portal.

Describe aria attributes with more informative values:
Some aria attributes are generic, given more time I would change some of these attributes to be descriptive 

Better styling:
The index page and modal design isn't particularly aesthetically pleasing and can be styled better.

Replace more px styled elements:
Replace px styled elements with % and em.

Functional form:
Give functionality to the form on the modal using Yup and Formik. Implementing validation and a object payload. Object payload would have use values stored in the state. 

Incorporate media in the modal:
Add an image or video into the modal with the alt text and audio description.

More thorough testing:
More testing can be implemented to ensure absolutely all elements are compliant. For example the colour contrast test only checks the colour code of the h elements of the modal against the colour code of the background element.

# Getting Started

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
OR
### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.