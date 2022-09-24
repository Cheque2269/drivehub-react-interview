# DRIVEHUB REACT INTERVIEW TEST
## Problems
- We implementing a bulk renting car
- We provide car list API which is contains car title, photo and price
- We provide discount list API which is contains code and amount
- Create a list of cars and cart checkout
- You can refactor anyway you want

## Wireframe
- Have CarList Component on the left and Cart Component on the right
![Wireframe](wireframe.png)


## Requirements
- As a User, I want to pick many cars as I want
- As a User, I want to see car photo that I picked
- As a User, I want to change amount of each car
- As a User, I want to see total amount of the cart
- As a User, I want to apply a discount coupon
- As a User, I want to refresh the page and the cart is not clear !!!
- You can use any css tool or framework 
- Calculate price on the frontend

## APIs
- Car List `https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car`
- Discount List `https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount`
- access_token `VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o`
- Just put access_token as a params or put it in request header `Authorization: Bearer ${access_token}` should be fine
- API doc `https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/authentication`

## Nice to Have
- Unit Tests
- Component reusable
- Responsive Design
- Sorting by title or price
<br/><br/>
### Zip the project and send back to us.
### PS. Please ignore `The Blackhole` aka `node_modules` before zipping :D.
<br/><br/>
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
