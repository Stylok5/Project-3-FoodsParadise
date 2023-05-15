# Project 3 - Foods paradise

`Check out the top 10 foods in the world. Log in to add a review, make a list of your favorites foods and their ingredients or create and add your own food to the list!`

## Table of Contents:

1.  Project Overview
2.  Installation
3.  Features
4.  Project Brief
5.  Technologies Used
6.  Timeline
7.  Wins and Challenges
8.  Future Content and Improvements
9.  Key Learnings
10. Credits

## Project Overview

Project 3 was an incredible experience where I had the opportunity to work collaboratively with two talented team members to develop my first full-stack application. After a brief discussion, we decided to create a website that would allow users to browse the top 10 foods in the world, add them to their favorites, create custom foods, or leave reviews for existing ones. Collaborating with my team members was a rewarding and enjoyable experience, and this project turned out to be one of my favorites from my time at GA. In fact, I would love to work on similar projects in my future career.

You can find the deployed project [here](https://foods-paradise.netlify.app/)

As most actions are locked before authentication registration would be required, but you can also use the premade user's credential which would be: user@gmail.com for email and **userPassword** for password.

![Alt text](https://i.imgur.com/HSCCc9N.png "Optional title")

## Installation

To run this project you have to type in your terminal git clone and the name of the ssh key inside an empty folder. Run **code .** to open the directory in your Visual Studio Code. There you can right click the backend folder and **open in integrated terminal**. To run the backend you need to have Node.js installed. To install Node.js visit its website [here](https://nodejs.org/), download the appropriate version of Node.js for your operating system. Run the downloaded installation file and follow the prompts to install Node.js on your computer. In the Visual Studio Code terminal type **node -v** and press Enter to verify that Node.js is installed and to check its version. Now for the project installation steps:

1. When you are in the backend terminal you need to install some dependencies so run **npm install**.
2. After that, run the server by typing **npm start**.
3. Now right click on the frontend folder and again **open in integrated terminal**.
4. Install the necessary dependencies by running **npm install**.
5. Type **npm run dev** in the frontEnd terminal to run the server and then open that url in your browser.

## Features

- Home page displaying random facts about some of the foods included in the list
- Browse page displaying the top 10 foods in the world with images and their country of origin and a search bar to search a food by its country
- Detail page for each food with more information and the ability to leave a review
- List page where users can add and remove foods from their personal list as well as create their own custom foods
- User authentication system using JWT
- Backend API built with Node.js and Express.js
- Database using MongoDB atlas to deploy

## The Brief

- Build a full-stack application by making your own backend and your own frontend
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate frontend built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Be deployed online so it's publicly accessible

## Technologies Used

### Backend:

- Node.js: a JavaScript runtime built on Chrome's V8 JavaScript engine
- Express: a popular Node.js framework for building web applications
- Mongoose: an Object Data Modeling (ODM) library for MongoDB and Node.js
- bcrypt: a library for hashing passwords
- Cloudinary: a cloud-based image and video management service
- CORS: a middleware that enables Cross-Origin Resource Sharing (CORS) for Express
- Dotenv: a module that loads environment variables from a .env file
- express-validator: a middleware for validating request data in Express
- jsonwebtoken: a library for generating and verifying JSON Web Tokens (JWT)
- uuidv4: a library for generating UUIDs

### Frontend:

- React: a JavaScript library for building user interfaces
- Bootstrap: a popular CSS framework for building responsive web pages
- Axios: a promise-based HTTP client for making API requests from the browser
- react-bootstrap: a library that provides Bootstrap components as React components
- react-router-dom: a library for routing and navigation in React applications
- Sass: a popular CSS preprocessor

## Timeline

### Day 1

On our first day, we began by brainstorming ideas for our main project and setting stretch goals. We documented our plan in Excalidraw, a collaborative whiteboarding tool. We decided to work together using Visual Studio Code's live share option, which allowed us to correct each other, share thoughts, and solve problems as a team. Although this approach may have taken us more time in the short term, it proved invaluable in helping us better understand the code we were writing by explaining it to each other.

### Day 2,3

On our second day, we started working on the backEnd. We began with the basics like creating the server.js and consts.js file and tested the backEnd with Postman. We stored the DB_CONNECTION_STRING and JWT_SECRET in the .env file which was included in the .gitignore file.

![Alt text](https://i.imgur.com/QXJVQsQ.png "Optional title")

![Alt text](https://i.imgur.com/3jw3PEa.png "Optional title")

The **DB_CONNECTION_STRING** and **JWT_SECRET** come from the **.env** file that we later added in the backEnd folder and was included in the .env that our **.gitignore** file contained. Then we continued to create our food and user models.

foodSchema:

![Alt text](https://i.imgur.com/Pyl9kpj.png "Optional title")

On the following days we added a utils folder which would include the seed data and the connectToDb function used in the server.js file.

connectToDb function:

![Alt text](https://i.imgur.com/HJYEro8.png "Optional title")

To better organize our data, we kept the food and user data in separate files within the utils folder:

![Alt text](https://i.imgur.com/wWwtfkp.png "Optional title")

### Day 4,5

On the fourth day, we shifted our focus to writing the middleware for the project. We began by creating a middleware folder that would contain several middleware functions such as a validator middleware, a logger, a fallback function, an error handler, and an authentication middleware.

Middleware folder:

![Alt text](https://i.imgur.com/HqTRQsQ.png "Optional title")

Auth middleware:

![Alt text](https://i.imgur.com/7u2OmnL.png "Optional title")

Then we started working on the more time consuming and challenging part of the backend, that being the controllers and the router.js file. We first started with the easiest ones like the food controller and router.

We created some of the routers using the auth and validate middleware in some of them :

![Alt text](https://i.imgur.com/XxOOJaV.png "Optional title")

We then wrote the code for the controllers used in the routers like the foodController:

![Alt text](https://i.imgur.com/d67W2X2.png "Optional title")

All the functions of each controller are exported in an object form so that they are easily accessed in the router file:

![Alt text](https://i.imgur.com/q1WLsi8.png "Optional title")

As it turned out, we had the most trouble with the reviews part. First we had to figure out how to set up the review schema and then how to implement the reviews array inside the foodSchema:

![Alt text](https://i.imgur.com/46YRrfs.png "Optional title")

Then for the controller we had to push the review with the text that was created in the req.body into the reviews array and save the food.

![Alt text](https://i.imgur.com/mgTYJrg.png "Optional title")

### Day 6,7,8,9 and 10

On day six we finished the final controllers for the backend and got started on the frontend side. The register and login page were completed first as we had done something similar before in class.
We also added errors and some additional validation.

![Alt text](https://i.imgur.com/9lGBvsm.png "Optional title")

We then shifted our attention to the navbar and homepage. For the navbar we wanted to have some conditional rendering if the user was signed in or not. So if the user was logged in, the Register and Login links in **Home Explore Register Login** would be replaced
by **my List** and **logout**.

![Alt text](https://i.imgur.com/UevcAzb.png "Optional title")

![Alt text](https://i.imgur.com/HpgPVMe.png "Optional title")

Our footer was quite similar with a slightly different style, while the homepage did not have any additional functionality as it mainly focused on improving the visual design.

The explore page was next and was propably the trickiest one. We first worked on the search bar logic, making it so that you could search for a food by country using a dropdown menu and then rendered each food on the page.

Search bar logic:

![Alt text](https://i.imgur.com/UXGKJTn.png "Optional title")

After that we added the food page, which would contain a more detailed description of each food, with a form to leave a review as well.

### Day 11,12

While working on the project, we mainly collaborated using Visual Studio Code's live share feature. However, as the deadline approached, we found that, while helpful, this approach was quite time-consuming. As a result, we decided to split the workload among team members to improve efficiency. We worked on separate branches and later merged them with the main branch in GitHub. I was responsible for creating the “My List” page, while my team members worked on styling and the “Add a Review” feature. On the My List page, I aimed to provide users with the ability to create a custom food item by submitting a form. Additionally, users could add foods from the Explore page to their list and remove items using a delete button. This allowed users to curate a personalized list of their favorite foods.

Remove from list logic using **filter** function:

![Alt text](https://i.imgur.com/2myhI2I.png "Optional title")

foodId was used as a parameter in the remove function and item.\_id was passed as an argument in the onClick function of the button:

![Alt text](https://i.imgur.com/LM7fhnz.png "Optional title")

The form was created in a similar way with the register and login page:

![Alt text](https://i.imgur.com/ynhhvlx.png "Optional title")

by using spread operator to push the e.target.value to each input by selecting its name with [e.target.name]:

![Alt text](https://i.imgur.com/CthINiW.png "Optional title")

After finishing my work on the List page, I assisted one of my teammates with implementing the "add review" feature. We encountered a minor challenge where we were unable to display the newly added review on the page without a refresh. Eventually, we discovered that we simply needed to send an axios.get request for that specific food item again.

![Alt text](https://i.imgur.com/F3tuKSC.png "Optional title")

After creating the 'My List' page and 'Add Review' feature, we wanted to add a button to allow users to add foods to their list directly from the explore page. This was done with some guidance from our instructor as we ran into some problems. To indicate whether a food had already been added to the list, we implemented a checkmark icon that appears on the button after the food is added. For this to work we created a separate food card component where we checked if the food already existed in the user's list with a find function:

![Alt text](https://i.imgur.com/JT9hyb7.png "Optional title")

and used ternary operator to render the buttons:

![Alt text](https://i.imgur.com/o4H0z0K.png "Optional title")

Then the Food card was used in the explore page:

![Alt text](https://i.imgur.com/2tf25zN.png "Optional title")

### Day 13

On the last day, we spent time fixing minor bugs, enhancing the styling, and deploying the project. To deploy the frontend, we used **Netlify** and for the backend, we utilized **MongoDB Atlas**.

## Final project:

#### Homepage:

![Alt text](https://i.imgur.com/HSCCc9N.png "Optional title")

#### Explore page:

![Alt text](https://i.imgur.com/F3VwMlN.png "Optional title")

#### Food page:

![Alt text](https://i.imgur.com/eG5maSl.png "Optional title")

#### My list page:

![Alt text](https://i.imgur.com/kMvo5VT.png "Optional title")

#### Register page:

![Alt text](https://i.imgur.com/eqPh45p.png "Optional title")

#### Log in page:

![Alt text](https://i.imgur.com/RpGnqWo.png "Optional title")

## Wins and Challenges

### Wins

We faced an issue where our authentication token would be lost when we refreshed the page while logged in which took a to figure out. Another significant achievement was successfully implementing the 'add to list' button and its ability to change to a checkmark if the food was added.

### Challenges

Most of our challenges were encountered in the frontend development. We found implementing the search bar and adding review functionality a bit challenging, but we were ultimately able to find solutions for both.

## Future Content and Improvements

Some of my future content plans:

- Make the styling responsive to different screen sizes and improve the styling of the ingredients
- Adding the ability to update, edit food in My List page
- Ability to edit the review

## Key Learnings

This project was the most challenging so far in the course as we had to create both the backend and frontend ourselves, but also because it was the first group project we had done. However, it taught me valuable lessons on how to effectively communicate ideas and code with my team members, organize meetings, do some pair programming, and push each other to write better code. In addition, the project provided me with valuable experience in managing my time when working on a larger-scale project and gave me insight into how roles are assigned to different team members. I also gained a lot of experience using GitHub as well, working on different branches, committing and pushing code. Overall this was a great and very useful experience in my coding career, one that I would want to replicate again in the future.
