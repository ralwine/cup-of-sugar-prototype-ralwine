g
# Cup of Sugar

## Description

_Duration: 2 Week Sprint_

U.S. households let a significant amount of food go to waste, and there is a general lack of awareness around individual contribution to the problem. Cup of Sugar is a mobile application that can increase awareness of the amount of food waste in your household and allow you to connect with your neighbors to share food.

Cup of Sugar is a food-sharing prototype for a small-scale community such an an apartment building or condominium complex. The app streamlines the process of offering up the food that you can't use and requesting the food that you need. It contains an activity feed that allows you to see the food sharing activity in your community, as well as a group page with neighbor's user profiles to help strengthen community connections. 

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](https://cup-of-sugar-04f2e395958a.herokuapp.com/#/home)

## Screen Shot
<img width="200" alt="homescreenpng" src="https://github.com/ComparettoH/cup-of-sugar/assets/116385698/eb09db40-a5dc-42fe-8507-2cf9d60e47f8">
<img width="200" alt="activityFeed400" src="https://github.com/ComparettoH/cup-of-sugar/assets/116385698/9020c113-c1ad-4fcd-8492-684832f51ac5">
<img width="200" alt="offerDetails" src="https://github.com/ComparettoH/cup-of-sugar/assets/116385698/11721e1d-5269-4a16-a539-33e9efe8b017">

## Technologies Used
Nodejs, JavaScript, HTML, CSS, Reactjs, Redux, PostgreSQL, Material UI, Figma (for wireframing), Cloudinary

### Prerequisites
- [Node.js](https://nodejs.org/en/)

## Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. Run this command in your terminal: `git clone {SSH key here}`  
4. Navigate to the repository's folder in your terminal
5. Open VS Code and open the project's folder
6. Run `npm install` in the VS Code terminal to install all dependencies
7. Create a [cloudinary
](https://cloudinary.com/documentation/cloudinary_credentials_tutorial#:~:text=Log%20into%20your%20Cloudinary%20Console,Secret%20and%20API%20Environment%20Variable) account. Then use this link to find your cloudinary URL, cloud name, and api key and secret for your `.env` file.
9. Create a `.env` file at the root of the project and paste these lines into the file. While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string. 

```
   SERVER_SESSION_SECRET=superDuperSecret
   CLOUDINARY_URL=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   EMAIL_PASS= ( See this tutorial link for instructions on setting up an “App Password” that will allow the app to log in and send emails from this account.)
   EMAIL_USER= ( This is the email address )
```
9. Create a database named `cup_of_sugar`. If you would like to name your database somethingg else, you will need to change `cup_of_sugar` to the name of your new database name in `server/modules/pool.js`.
10. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
11. Run `npm run server` in your terminal
12. Run `npm run client` in your terminal
13. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Navigate from the home page to the registration page using the 'Sign Up' button
2. Read the 'How It Works' page and click the 'Get Started' button 
3. Create a user profile
4. Click the 'Group Info' button and navigate to the group page to view your group's sharing location and other neighbors' user profiles
5. Use the bottom nav bar to navigate to the activity feed
6. Use the bottom nav bar to navigate to the request item form. Make a request and view it in the activity feed.
7. Use the bottom nav bar to navigate to the offer item form. Make an offer and view it in the activity feed.
8. In the activity feed, toggle Requests, Shares, and Offers bars to view different content in the 'All Activity' section
9. Click on individual offers and requests in the 'All Activity' section to view the detailed view of the food-sharing activity
10. Click on the pencil icon on individual offers and requests in the 'My Activity' section to edit a food-sharing activity
11. Click on the eye icon on individual offers and request in the 'My Activity' section to see the details of a completed food-sharing activity


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped us to make this application a reality. 

