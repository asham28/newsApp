# BlogTO News Scrapper 

## Description
This app scrapes BlogTO to show the user the top news articles of day. Users can save their favourite articles onto another page. Each article displayed includes a headline as well as a link to the source article. Users can unsave an article by clicking on the 'remove' button. 

The app uses Node/Express for the server and routing, MongoDB/Moongoose for the database and modles, Handlebars for layout, and Cheerio for scraping the data from www.blogto.com. 


## Technologies Used
- Frontend:
    - HTML
    - CSS
    - Bootstrap
- Backend:
    - Javascript
    - Node and Express Web Server
    - MongoDB
    - Moongoose
    - Heroku

## Getting Started

Follow the instructions below to run this project on your local machine. Note: you will need Node.js and MongoDB installed locally. 

1. Install dependencies by running 'npm install'
2. In your CLI, enter 'mongod'
3. In a different CLI, go to root of directory and enter 'node server.js'
4. In browser, go to http://localhost:3000