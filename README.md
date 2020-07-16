# Weather-App
![Weather App Screenshot](https://github.com/csrzepka/node3-weather-website/blob/master/screenshots/New-Home.PNG)
To view a live version of this application, you can check out the deployment on [Heroku](https://csrzepka-weather-application.herokuapp.com/).

## About the Application
The foundation of this project was built alongside the udemy course [The Complete Node.js Developer Course (3rd Edition)](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/). This Weather App Project was made to demonstrate Asynchronous Node.js, Web Servers, API Calls, and Application Deployment. To learn more about this be sure to check out this course.

The original version of the application was built using the [WeatherStackAPI](https://weatherstack.com/), the [MapBoxAPI](https://www.mapbox.com/), and [Handlebars.js](https://handlebarsjs.com/), with minimal HTML structure and CSS styling. To add more information and improve the information available on the website, I changed the website to run off of the [OpenWeatherAPI](https://openweathermap.org/), using their free new One Call API as they provide a lot more weather information on their free tier.

I will provide more information and images comparing my new version to the original from the udemy course.

## Starting the project

To start this project, run `npm i` to install the dependent npm libraries.

This project runs off of the [OpenWeatherAPI](https://openweathermap.org/) (Using the OneCallAPI) and the [MapBoxAPI](https://www.mapbox.com/). To run this application locally on your machine, you will need access to these two APIs, and the free version of both will suffice. Once you have the two api keys, you will need to create a new `.env` file in the root of the project to add the API keys:
```
#.env

MAPBOX_API=somekey

OPENWEATHER_API=somekey

PORT=3000
```
Once you have that file created, you can start the application by running `npm start`.

To launch the project in development mode, you can run `npm run dev`.
