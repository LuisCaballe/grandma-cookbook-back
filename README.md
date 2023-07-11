# **Grandma's Cookbook**

[![Testing](https://github.com/LuisCaballe/grandma-cookbook-back/actions/workflows/testing.yml/badge.svg)](https://github.com/LuisCaballe/grandma-cookbook-back/actions/workflows/testing.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=LuisCaballe_grandma-cookbook-back&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=LuisCaballe_grandma-cookbook-back)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=LuisCaballe_grandma-cookbook-back&metric=coverage)](https://sonarcloud.io/summary/new_code?id=LuisCaballe_grandma-cookbook-back)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=LuisCaballe_grandma-cookbook-back&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=LuisCaballe_grandma-cookbook-back)

## **Project links**

### **Front**

- [repo](https://github.com/LuisCaballe/grandma-cookbook-front)
- [prod](https://grandmas-cookbook.netlify.app/)

### **Back**

- [repo](https://github.com/LuisCaballe/grandma-cookbook-back)
- [prod](https://luis-caballe-final-project-back-202304.onrender.com/)
## **Introduction**

Grandma's Cookbook is an application that allows users to create and manage a private collection of favourite recipes, preserving their culinary heritage.

Enjoy your meal!

[Visit Grandma's Cookbook](https://grandmas-cookbook.netlify.app/)

Use the following credentials for testing purposes: \*

```
Username: admin
Password: admin
```

<small>\* Please note that the custom API rest is hosted on a free render.com account, so please be patient when logging in (you will have to wait about a minute).
</small>

<img src="https://cdn.discordapp.com/attachments/1114233686947270749/1126554378053111869/mobile.webp" alt="Grandma's Cookbook mobile screenshots">
<img src="https://cdn.discordapp.com/attachments/1114233686947270749/1126551681845448784/desktop.webp" alt="Grandma's Cookbook desktop screenshot">


## **Tech stack**

Grandma's Cookbook uses the MERN technology stack, which consists of MongoDB, Express.js, React, and Node.js. And it is built using the following technologies:

### **Build with:**

<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-Runtime-green" alt="Node.js"></a>
<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-Framework-orange" alt="Express.js"></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Language-blue?logo=typescript" alt="TypeScript"></a>
<a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-Authentication-green?logo=jsonwebtokens" alt="JWT"></a>
<a href="https://www.npmjs.com/package/bcrypt"><img src="https://img.shields.io/badge/bcrypt-Password%20Hashing-blueviolet" alt="bcrypt"></a>
<a href="https://mongoosejs.com/"><img src="https://img.shields.io/badge/Mongoose-ODM-red" alt="Mongoose"></a>
<a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" alt="MongoDB"></a>

### **Tested with:**

<a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Jest-Testing-red" alt="Jest"></a>
<a href="https://www.npmjs.com/package/supertest"><img src="https://img.shields.io/badge/Supertest-HTTP%20Testing-orange" alt="Supertest"></a>
<a href="https://mongodb.github.io/node-mongodb-memory-server/"><img src="https://img.shields.io/badge/MongoDB%20Memory%20Server-Testing-lightgrey" alt="MongoDB Memory Server"></a>

### **Good Practices Tools:**

<a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-Code%20Linting-yellow?logo=eslint" alt="ESLint"></a>
<a href="https://typicode.github.io/husky"><img src="https://badgen.net/badge/Husky/v7.0.4/blue" alt="Husky"></a>
<a href="https://prettier.io/"><img src="https://img.shields.io/badge/Prettier-Code%20Formatting-ff69b4?logo=prettier" alt="Prettier"></a>

<small>For a full list of dependencies and scripts used, see the package.json file.</small>

## **Setup**

To set up and run Grandma's Cookbook in your local environment, follow these steps:

1. Clone this repository to your choosen local directory:

    ```
    git clone https://github.com/LuisCaballe/grandma-cookbook-back.git
    ```

2. Install the dependencies:

    ```
    npm install
    ```

3. Build the application:

    ```
    npm run build
    ```

4. Start the application:

    ```
    npm run start
    ```

## **Endpoints**

### **GET /**
- Method: GET
- URL: https://luis-caballe-final-project-back-202304.onrender.com/
- Response: { message: "🏓 Pong" }

### **POST /user/login**

- Method: POST
- URL: https://luis-caballe-final-project-back-202304.onrender.com/user/login
- Body: {"username":"admin", "password":"admin"}
- Response: token

### **GET /recipes**

<small>(The request must have a valid token)</small>
- Method: GET
- URL: https://luis-caballe-final-project-back-202304.onrender.com/recipes
- Response: list of recipes

### **GET /recipes/:recipeId**

<small>(The request must have a valid token)</small>
- Method: GET
- URL: https://luis-caballe-final-project-back-202304.onrender.com/recipes/:recipeId
- Response: selected recipe

### **GET /recipes?filter**

<small>(The request must have a valid token)</small>
- Method: GET
- URL: https://luis-caballe-final-project-back-202304.onrender.com/recipes?filter=Easy
- Response: list of recipes with **easy** cooking difficulty

### **DELETE /recipes/:recipeId**

<small>(The request must have a valid token)</small>
- Method: DELETE
- URL: https://luis-caballe-final-project-back-202304.onrender.com/recipes/:recipeId
- Response: { message: "Recipe deleted" }

### **POST /recipes/add**

<small>(The request must have a valid token)</small>
- Method: POST
- URL: https://luis-caballe-final-project-back-202304.onrender.com/recipes/add
- Body: {added recipe}
- Response: {new recipe}

### **PUT /update/:recipeId**

<small>(The request must have a valid token)</small>
- Method: PUT
- URL: https://luis-caballe-final-project-back-202304.onrender.com/recipes/update/:recipeId
- Body: {updated recipe}
- Response: { message: "Recipe updated successfully" }

<small>For more information on endpoints, please refer to the file grandma-cookbook.postman_collection.json</small>
## **Author**

<a href="https://github.com/LuisCaballe">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Badge"/>
</a>
<a href="https://www.linkedin.com/in/luiscaballe/">
  <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
</a>
