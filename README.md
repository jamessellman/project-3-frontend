# SEB PROJECT 3

# Description

Gourmet E-Shop is a website where sellers can display their products for sale. Sellers can edit and delete their own products from our database. Users can browse our website to discover a variety of products and make purchases. They can also leave reviews for products they've tried. Successful purchases increase the units sold for the product and aggregate total sales for the seller.

![alt text](<Screenshot 2024-05-11 at 16.58.08.png>)

# Deployment link

- https://gourmet-e-shop-front.netlify.app/ (frontend)
- https://gourmet-e-shop.netlify.app/api/products (backend)

# Getting Started/Code Installation

```
1. Clone the front-end repository to your local machine.
2. Navigate to the root of the project directory.
3. Run `npm install` to install all dependencies.
4. Execute `npm run dev` to start the development server.
5. Open your browser and go to `http://localhost:3000` to view the app.
```

# Timeframe & Working Team (Solo/Pair/Group)

- This was a group project. I was placed in a team with Marine Crouzet and Liv Darby.

  https://github.com/MarineCrou

  https://github.com/livdarby

- We had one week to complete our full-stack application. This involved designing and populating our database, creating fully operational routes and controllers, and crafting a user-friendly interface to interact with our data on the front end.

# Technologies Used

## Front-end

- HTML
- CSS
- Bulma
- React

## Back-end

- Express
- Mongodb
- Mongoose
- Mongo Atlas- Mongodbcompass
- Insomnia

## Deployment

- Netlify

## Version control

- GitHub

# Brief

- Work in a team, using **git to code collaboratively**.
- **Build a full-stack application** by making your own backend and your own front-end
- **Use an Express API with mongoose** to serve your data from a Mongo database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
- **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
- **Be deployed online** so it's publicly accessible.

# Build/Code Process

### Planning (Day 1)

- Our first task was conceptualizing our project. We settled on developing an E-shop platform where sellers could showcase their products, and users could browse, leave feedback, and make purchases. We then wireframed and designed our project, as detailed in the planning section of this README.

![alt text](<Screenshot 2024-03-28 at 17.16.44.png>)

![alt text](<Screenshot 2024-03-28 at 17.16.57.png>)

## Backend (Day 1, 2)

### Backend set up and models

- To begin development, we utilized starter code and hosted repositories on GitHub for both the backend and frontend, facilitating collaboration. The first day was dedicated to collaborative work, with a focus on pair programming, starting with backend development.
- In the INDEX.TS file, we established the start function to connect to the database via mongoose, naming it "shopdb". We utilized app.listen to designate the port for running the database and implemented necessary middleware applications.

![alt text](<Screenshot 2024-03-28 at 17.36.03.png>)

- We created both the product and user models necessary for adding data to our database. Additionally, we seeded the database with test data to ensure functionality and facilitate testing of various features of our application. Below is our product model with typescript interface.

![alt text](<Screenshot 2024-03-28 at 17.39.11.png>)

### Seeding

- Here is our seeding function. Also, in this file we created test data which followed the product model format.

![alt text](<Screenshot 2024-03-28 at 17.40.09.png>)

- With our models and test data set up, we imported them into our seeding file. Initially, we seeded the users, followed by populating products. During this process, we iterated over each product, associating it with an admin user. We verified this by inspecting the data in MongoDB Compass.

### Controllers & secure route

- Once our database was populated, we established routes and controllers to facilitate data manipulation. Firstly, we crafted a product controller with a method to retrieve all entries from the database. Subsequently, we configured a route with a URL endpoint to invoke this retrieval function, testing it using Insomnia. Once confirmed, we implemented another function to fetch a single product by its unique identifier.
- Next, we aimed to create a function within the product controller to add a product. We set up the function and corresponding route. However, we realized our model required a user association with each product, which necessitated the user's ID stored within the token provided upon login. Since we hadn't implemented sign-in and login functionalities, we couldn't obtain a token.
- Acknowledging this limitation, we decided to prioritize setting up the user aspect of our project. We created a new file named user controller and established a function to create a user, along with the appropriate route in index.ts. Additionally, we revisited our user model to incorporate password hashing and validation to ensure strong passwords, unique emails, and valid email formats. We tested user creation in Insomnia and verified the new user's presence in MongoDB Compass.

![alt text](<Screenshot 2024-03-28 at 18.00.07.png>)

![alt text](<Screenshot 2024-03-28 at 18.03.21.png>)

- On the second day, we finalized the user controller by implementing a login function that generates a token for the user. This token stores user data and remains valid for 24 hours after generation.
- Additionally, we introduced a secure route function and applied it to the "add a product" route. This function verifies the token provided by the user, ensuring it originates from our app, before granting access.

![alt text](<Screenshot 2024-03-28 at 18.07.54.png>)

![alt text](<Screenshot 2024-03-28 at 18.08.58.png>)

- With access to a token, we proceeded to test the "add a product" function in Insomnia.
- Following that, we focused on expanding functionality, incorporating features for deleting and editing products. We implemented these functions in the product controller and configured the corresponding routes, ensuring secure access where necessary.
- Additionally, we introduced a function to transmit the current user data from the backend to the frontend, anticipating its requirement in future frontend development.
- To enhance error handling, we integrated custom error management and created a validation.ts file for validation purposes.

## Frontend (Day 2, 3, 4, 5)

### Inital pages set up

- With our backend functionality successfully implemented and tested, we shifted our focus to frontend development using React. Utilizing provided starter code, we began by setting up the router inside app.tsx and defining routes for each planned page from our wireframe, including the addition of a navbar.

![alt text](<Screenshot 2024-03-30 at 12.47.31.png>)

- We set up basic pages, each represented by a separate component, and linked them using the router, integrating them into the navbar. Testing navigation through the navbar confirmed functionality.
- One component, our list page, was designated to display all products. Leveraging an async function, fetchProducts, within a useEffect hook, we fetched product data from the backend route. Upon receiving the data, we utilized useState to store it, allowing us to render individual product cards on the page. Initially, we displayed only essential product information like title, image, and price on each card, with plans to showcase additional details upon card selection, a feature we later implemented.

![alt text](<Screenshot 2024-03-30 at 12.49.37.png>)

### Establishing different views for logged in users

- Next, we established two additional components: one for user sign-up and another for user login, both connecting to corresponding routes in the backend.
- Lastly, we created a component for creating a product, linking it to the appropriate backend route.
- Once users could log in on the frontend, we aimed to differentiate between logged-in and logged-out views. For logged-in users, certain navbar components like sign-up and log-in were hidden, while others like create-a-product became visible.

![alt text](<Screenshot 2024-03-30 at 12.51.02.png>)

### Displaying single products

- We developed a component to display individual products, utilizing the product's ID and a link to navigate upon card click. This link directs users to a dedicated page showcasing the chosen product. On this page, we added a delete button targeting the correct backend route, visible only to the product creator.
- Furthermore, we expanded our product model to include a category, updating the "create a product" component to allow users to add a category. We provided hardcoded options in a dropdown menu for selection.

![alt text](<Screenshot 2024-03-30 at 12.54.44.png>)

### Search bar and filtering

- We added a search bar and dropdown to product lists, allowing users to refine displayed data. However, we encountered a bug where the search did not reset after using the dropdown filter. We refactored the search criteria code to address this issue, ensuring that the filter resets correctly to display all information.
- Afterward, we enhanced the styling and functionality of the individual product page to include additional details like description and category. Finally, we added a buy button to individual product cards for users who were not signed in.

![alt text](<Screenshot 2024-03-30 at 12.55.53.png>)

### Purchasing, combining units sold & reviews

- Implemented functionality to track units sold per product and total sales for each user. The buy button increments units sold upon purchase.
- Enhanced shopping experience with a modal for purchase details input and a dropdown menu for selecting the country to calculate shipping costs.
- Developed a seller homepage displaying all products listed by a seller, along with their combined sales, accessible upon user login for efficient product management.

![alt text](<Screenshot 2024-03-30 at 13.15.05.png>)

- Integrated a reviews section into individual product cards, allowing users to leave feedback. This required adjustments to the product modal to associate reviews with each product.

## Final styling

- We finalised styling adjustments across the homepage, product lists, seller homepage, and individual product cards to enhance their appearance.
- Additionally, for added enjoyment, we implemented confetti that appears on the screen upon a successful purchase. Accompanied by a modal, users are notified of their purchase with a celebratory message.

![alt text](<Screenshot 2024-03-30 at 13.12.43.png>)

### Deployment

- With our project completed, the final day was dedicated to deployment. We deployed the backend using MongoAtlas and the frontend using Netlify.

# Screenshot Walkthrough

- Visitor home page
  ![alt text](<Screenshot 2024-03-28 at 16.55.14.png>)

- Visitor product list
  ![alt text](<Screenshot 2024-03-28 at 16.55.56.png>)

- Visitor individual product
  ![alt text](<Screenshot 2024-03-28 at 16.56.41.png>)

- Reviews
  ![alt text](<Screenshot 2024-03-28 at 16.57.41.png>)

- Purchase a product
  ![alt text](<Screenshot 2024-03-28 at 16.58.04.png>)

- Sign up & log in
  ![alt text](<Screenshot 2024-03-28 at 16.58.35.png>)
  ![alt text](<Screenshot 2024-03-28 at 16.58.41.png>)

- Seller homepage
  ![alt text](<Screenshot 2024-03-28 at 16.59.33.png>)

- Add a product page
  ![alt text](<Screenshot 2024-03-28 at 16.59.33-1.png>)

- Seller individual product
  ![alt text](<Screenshot 2024-03-28 at 17.00.40.png>)

- Edit a sellers product
  ![alt text](<Screenshot 2024-03-28 at 17.01.25.png>)

# Challenges

- Designing the database presented a significant challenge as we aimed to define the exact functionality our app would offer. However, as we expanded our app's capabilities over time, we needed to revise our product and user models. This had a cascading effect on many controllers, requiring extensive refactoring to ensure continued functionality.
- Working in a team of three presented unique challenges. Collaborating on the same components simultaneously often led to merging issues, requiring close coordination among team members to maintain code coherence and integrity.

# Key Learnings/Takeaways

- Working in a team posed challenges such as merging conflicts. However, we learned to collaborate effectively by discussing our changes and ensuring smooth integration.
- Thoroughness in designing backend models is crucial. Adding new functionality later on may require model changes, leading to cascading effects on existing code and necessitating extensive refactoring.
- This project provided valuable insights into styling, particularly in leveraging the features of Bulma effectively.

# Bugs

- To submit a review, the page currently reloads, which can be slow and not ideal for user experience (UX). We've implemented a window.location.reload event handler for the "Post a Review" button. However, we aim to improve this by enabling users to post a review without reloading the window.
- On the homepage, there's an initial dark blue background before our background picture loads.
- Furthermore, we need to conduct further testing to identify any bugs. As of writing this README, no bugs have been discovered, but thorough testing will ensure the robustness of the application.

# Future Improvements

- On our homepage, we've included a section for shopping by category, showcasing separate cards for each category available in our database. Clicking on any of these cards takes you to the products list page, where all products are displayed. We considered implementing a feature where clicking on a specific category card would automatically filter the products to display only those within the selected category if we had more time.
- Additionally, we planned to add a basket feature, enabling users to add multiple items to their basket for a convenient shopping experience.
