# SEB PROJECT 3

# Description

- We have developed an E-SHOP where sellers can showcase their delicious products for sale. Sellers have the ability to edit and delete their products if they are the ones who added the product to our database.
- Users can visit our website to explore the wide range of products available and make purchases as desired. Additionally, users have the option to leave reviews for products they have experienced.
- Upon a successful purchase, the number of units sold for the respective product will increase, while also aggregating the total sales across all products for that particular seller.

# Deployment link

- https://gourmet-e-shop-front.netlify.app/products (frontend)
- https://gourmet-e-shop.netlify.app/api/products (backend)

# Getting Started/Code Installation

- Ensure that mongod is running to initialize the database.
- Open your terminal and navigate to the frontend directory.
- Type npm run dev in the terminal to start Vite and open a browser containing the frontend.
- Open another terminal window or tab and navigate to the backend directory.
- Type npm run dev in the terminal to start the backend server and establish communication with the database.

# Timeframe & Working Team (Solo/Pair/Group)

- This was a group project. I was placed in a team with Marine Crouzet and Liv Darby.

  https://github.com/MarineCrou

  https://github.com/livdarby

- We were tasked with completing our full-stack application within a tight deadline of one week. This encompassed designing and populating our database, developing fully operational routes and controllers, and crafting a user-friendly interface to effectively showcase and interact with our data on the front end.

# Technologies Used

- Express
- React
- Mongodb
- Mongoose
- HTML
- CSS
- Bulma
- Mongo Atlas
- Netlify
- GitHub
- Mongodbcompass
- Insomnia

# Brief

You must:

- Work in a team, using **git to code collaboratively**.
- **Build a full-stack application** by making your own backend and your own front-end
- **Use an Express API with mongoose** to serve your data from a Mongo database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
- **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
- **Be deployed online** so it's publicly accessible.

# Planning

![alt text](<Screenshot 2024-03-28 at 17.16.44.png>)

![alt text](<Screenshot 2024-03-28 at 17.16.57.png>)

# Build/Code Process

- DAY 1: (THURSDAY)

- Our initial step was to determine the concept for our project. We agreed on creating an E-shop platform where sellers could showcase their products, and users could effortlessly browse, leave feedback, and make purchases.
- We wireframed and designed our project which can be found above in the planning section of this README.
- To kickstart our development process, we utilized some starter code and I hosted two repositories on GitHub – one for the backend and another for the frontend, ensuring seamless collaboration and access for my teammates.
- With the setup completed, our team dedicated the first day to collaborative work, with myself driving for pair group programming starting with the backend.
- Our initial focus was on the INDEX.TS file, where we established the start function responsible for connecting to the database via mongoose. We named our database "shopdb" and utilized app.listen to designate the port for running our database, along with the requisite middleware application.

![alt text](<Screenshot 2024-03-28 at 17.36.03.png>)

- We created the product and user models required for adding data to our database and also seeded that database with test data. Below is our product model with typescript interface.

![alt text](<Screenshot 2024-03-28 at 17.39.11.png>)

- Here is our seeding function. Also, in this file we created test data which followed the product model format.

![alt text](<Screenshot 2024-03-28 at 17.40.09.png>)

- With the models and test data configured, we imported them into our seeding file. We initially seeded the users, followed by populating products. During this process, we mapped over each product, adding an admin user. We ensured this worked correctly by inspecting the data in MongoDB Compass.

- Now that our database was populated, we proceeded to establish routes and controllers, facilitating data manipulation. Firstly, we crafted a product controller with a method to retrieve all entries from the database. Subsequently, we configured a route, complete with a URL endpoint to invoke this retrieval function, checking it worked using Insomnia. Once confirmed, we implemented another function to fetch a single product by its unique identifier.

![alt text](<Screenshot 2024-03-28 at 18.00.07.png>)

- Next we wanted to set up a function inside of the product controller to add a product. We set up the function and the route but realised our model necessitated a user association with each product, which required the user's ID stored within the token provided upon login. However, as we have not set up sign in and log in, we were unable to get a token.
- Recognizing this bottleneck, we decided to shift our focus towards setting up the user aspect of our project.
- We set up a new file called user controller and set up a function to create a user along with the appropriate route in index.ts.
- We also retook a look at our user model and added hashing to the passwords. We also added validation to ensure passwords were strong, and email and username we unique. Emails also are required to be in valid email formats. We tested we could add a user in insomnia and checked in compass the new user was there.

![alt text](<Screenshot 2024-03-28 at 18.03.21.png>)

- DAY 2: (FRIDAY) BACKEND
- We started the second day finishing up the user controller. We set up a login function that provides the user with a token. This token stored data about the user and is valid for 24 hours after generation.
- We also added in a secure route function and added that to the add a product route. This secure route function would check the token being provided by the user to ensure it would a token given by our app and then allow access.

![alt text](<Screenshot 2024-03-28 at 18.07.54.png>)

![alt text](<Screenshot 2024-03-28 at 18.08.58.png>)

- Now that we had access to a token we can now test the add a product function in Insomnia.
- Next we looked at creating more functionality, with being able to delete a product and also edit a product. We created these functions in the product controller and added the correct routes in, with secure route function if required.
- A function was added to send the current user from the backend to the front end as this will be required later in the front end.
- Some custom error handling was added, along with a validation.ts file.

- DAY 2 (FRIDAY) FRONTEND

- With our backend functionality successfully implemented and tested, our focus shifted towards developing the frontend using React. Leveraging some initial starter code provided, we commenced our frontend development process.
- Inside app.tsx we created our router, and begin creating routes for each of the pages we had planned in our wireframe including adding a navbar.

![alt text](<Screenshot 2024-03-30 at 12.47.31.png>)

- We set up some basic pages, using a seperate component for each page. We linked these via the router and added to the navbar and tested we could move from page to page via the navbar.
- One of these components we called our list page, which we decided would be the page where we would display all of our products. Using an async function called fetchProducts inside of a useEffect targeted the route in the back end to get all of products and pulled all our data through to the front end. We then decided we wanted to display this data on individual cards on the page. Using a useState to set this data to a variable we were able to call this in our JSX and display all products on our page. We only showed on each card, the title, image and price as we have more data attached to each product that we wanted to show later on in more detail when we click on a card which we built later.

![alt text](<Screenshot 2024-03-30 at 12.49.37.png>)

- Next we set up 2 further components, 1 to sign up a user and 2 log in a user, targeting the correct routes built in the back end.
- Finally, we set up a create product component also targeting the correct route in the back end.

- DAY 3: (MONDAY)

- Now we could log in a user on the front end we wanted a user that was logged in to have a different view to one not logged in. If a user was present, we hid some components on the navbar such as sign up and log in, but made other components visable such as create a product.

![alt text](<Screenshot 2024-03-30 at 12.51.02.png>)

- We also set up another component to display an individual product by targeting the ID of that product and using a link to navigate upon clicking the card request. This link directs the user to a new page that exclusively showcases that specific product.
- On this specific product page, we added a button to delete the product, targeting the correct backend route. Furthermore, we implemented additional functionality whereby only the user who created the product would see the delete button.
- We made a modification to our product model to include a category. Consequently, we updated the create a product component to allow users to add a category as well. We provided hardcoded options for users to choose from in a dropdown menu for selection.
- A search bar and dropdown were added to the product lists. These elements capture user input, refiltering the displayed data to show only results from the database that match the search criteria. However, there was a bug wherein the search would not reset to display all options when the dropdown filter had been used.

![alt text](<Screenshot 2024-03-30 at 12.54.44.png>)

- DAY 4: (TUESDAY)

- Firstly, I refactored some of the search criteria code, which now allows the filter to be reset and display all information.
- Next, I restyled and refactored the individual product page to display additional information such as the description and category.
- Additionally, a buy button was added to the individual product card for users who were not signed in.

![alt text](<Screenshot 2024-03-30 at 12.55.53.png>)

- Functionality was implemented to display the number of units sold for each product, as well as a combined total across all products sold by a user. This feature was linked to the buy button, which increments the units sold each time it's pressed.
- To enhance the realism of the shopping experience, clicking the buy button triggers a modal to appear, prompting users to input necessary details for the purchase. Additionally, a dropdown menu was introduced to allow users to select their country. Depending on their location, variable shipping costs could be added to the price.
- A seller homepage was developed to showcase all the products listed by a seller, accompanied by their combined sales. Upon user login, they were automatically directed to this page for easy access and management of their listed products.

![alt text](<Screenshot 2024-03-30 at 13.15.05.png>)

- A reviews section was integrated into the individual product card, enabling users to leave feedback on products. This enhancement necessitated further modifications to the product modal, as reviews were now required to be associated with each product.

- DAY 5: (WEDNESDAY)

- We made final styling adjustments to enhance the appearance of the homepage, product lists, seller homepage, and individual product cards.
- Additionally, we introduced a fun element by incorporating confetti to appear on the screen whenever a visitor made a purchase. Accompanied by a modal, a message popped up, notifying the user of the successful purchase.

![alt text](<Screenshot 2024-03-30 at 13.12.43.png>)

- DAY 6: (THURSDAY)
- With our project finished, the final day was dedicated to the deployment of our app.
- The backend was deployed using MongoAtlas.
- The frontend was deployed using Netlify.

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

- Designing the database posed a significant challenge for us. We aimed to define the exact functionality we wanted our app to offer. However, as we expanded our app's capabilities over time, we encountered the need to revise our product and user models. Consequently, this had a cascading effect on many of the controllers we had built, requiring extensive refactoring to ensure the continued functionality of our code.
- Working in a team of three presented unique challenges that I had not encountered on previous projects. Collaborating on the same components simultaneously often led to merging issues, necessitating close coordination among team members to maintain code coherence and integrity.

# Key Learnings/Takeaways

- Working in a team introduced challenges like merging conflicts. However, we learned to collaborate effectively by discussing our changes and ensuring smooth integration.
- It's crucial to be thorough when designing backend models. Adding new functionality later on may require model changes, leading to cascading effects on existing code and necessitating extensive refactoring.
- Through this project, I gained valuable insights into styling, particularly in leveraging the features of Bulma effectively.

# Bugs

- To submit a review, currently, the page reloads. We implemented a window.location.reload event handler for the "Post a Review" button. However, this process is slow and not ideal for user experience (UX). Ideally, we would like to improve this by enabling users to post a review without reloading the window.
- Additionally, further testing is needed to identify any bugs. As of writing this README, no bugs have been discovered, but thorough testing will ensure the robustness of the application.

# Future Improvements

- On our homepage, we've included a section for shopping by category, featuring separate cards that render each category available in our database. Clicking on any of these cards directs you to the products list page, where all products are displayed. With more time, we would have explored implementing a feature where clicking on a specific category card would automatically filter the products to display only those within the selected category.
- Additionally, we intended to add a basket feature, allowing users to add multiple items to their basket for a convenient shopping experience.
