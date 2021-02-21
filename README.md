# MERN_twitter

## Mongo

MongoDB is a document-based NoSQL database that is scalable and flexible. In order to understand what this means, we will break down the above sentence in the sections below. MongoDB stores data using a document data structure. Documents are JSON-like objects with key-value pairs. Documents with similar data are stored within collections.

Mongoose - An object data modeling (ODM) library for MongoDB and Node.js. It provides an API to model the data in our database. You can think of it as a NoSQL equivalent of an ORM.

## Express

Express is a web application framework for Node. It provides us with tools for the following things:

1. Write handlers to respond to different HTTP verb requests at different URL paths. Similar to defining routes and controller methods in our Fullstack Projects, you will use Express to turn your backend into an API that your frontend will use to retrieve information.

2. Combine with view rendering engines to generate responses by passing data to templates. Express can also function similar to Rails by serving up 'views' as a response to a request. However, your frontend will be handled primarily by React and Redux so you will not be using this functionality.

3. Set common web application settings like which port to use.

4. Add middleware at any point within the request handling pipeline. Express middleware is similar to Rails controller callbacks, such as before_action or after_action. They allow you to apply some code or logic to HTTP requests or responses at any point during the request pipeline of your app.

## React

Axios is a promise based HTTP client that can be used in both the browser and a Node environment. This essentially means that you can use the Axios library to make XMLHttpRequests from the browser or HTTP requests from your Node environment.

## NodeJS

Node.js is a JavaScript runtime environment. In other words, it is an environment where you can run application code. JavaScript was originally designed only to be used in browsers. Node allows us to utilize JavaScript code outside of the browser in order to build network applications. You have already used Node to help manage your React app's dependencies as well as run webpack to bundle your JavaScript. Now you will be taking it one step further and using it as a runtime for your server to have a truly full-stack JavaScript app!
