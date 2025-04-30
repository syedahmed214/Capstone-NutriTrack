# Project Title

NutriTrack



## Overview



NutriTrack is a comprehensive web application designed to help users plan meals, track nutrition, and develop healthier eating habits.



### Problem



In today's fast-paced world, maintaining a balanced diet is challenging. People struggle with planning nutritionally balanced meals consistently, understanding their actual nutritional intake, finding time to shop for and prepare healthy meals, and tracking progress toward personal health goals. NutriTrack addresses these challenges by providing an all-in-one solution for meal planning, nutrition tracking, and dietary analytics.



### User Profile



- Health-conscious individuals:

    - looking to plan daily, weekly, or monthly meals

    - wanting to track their nutritional intake

    - needing to generate shopping lists based on meal plans

    - wanting insights into their dietary patterns



### Features



- As a user, I want to be able to create an account to manage my meal plans and nutrition data

- As a user, I want to be able to login to my account to access my personalized information



- As a logged in user, I want to be able to plan meals on an interactive calendar

- As a logged in user, I want to be able to search for and add recipes to my meal plan

- As a logged in user, I want to be able to track my daily nutritional intake

- As a logged in user, I want to be able to set and track progress toward nutritional goals



- As a logged in user, I want to be able to view analytics about my dietary patterns

- As a logged in user, I want to be able to generate shopping lists based on my meal plans

- As a logged in user, I want to be able to manage my pantry inventory



## Implementation



### Tech Stack



- React

- Redux

- MongoDB

- Express

- Node.js

- Client libraries: 

    - react

    - react-router

    - redux

    - tailwind CSS

    - axios

    - chart.js

- Server libraries:

    - express

    - mongoose

    - bcrypt for password hashing

    - jwt for authentication



### APIs



- Food nutrition database API for recipe nutrition calculation



### Sitemap



- Home page

- Register

- Login

- Dashboard

- Meal Planning Calendar

- Recipe Browser

- Nutrition Tracker

- Analytics

- Shopping List

- User Profile



### Mockups



#### Home Page

![](home.png)



#### Register Page

![](register.png)



#### Login Page

![](login.png)



#### Dashboard

![](dashboard.png)



#### Meal Planning Calendar

![](meal-planning.png)



#### Recipe Browser

![](recipe-browser.png)



#### Nutrition Tracker

![](nutrition-tracker.png)



### Data



![](data-model.png)



### Endpoints



**GET /recipes**



- Get recipes, with optional filters



Parameters:

- query: Search term

- category: Recipe category

- tags: Recipe tags

- token (optional): JWT for personalized results





Response:

```

[

    {

        "id": 1,

        "title": "Avocado Toast",

        "description": "Simple and nutritious breakfast",

        "ingredients": [...],

        "instructions": [...],

        "nutritionInfo": {...},

        "category": "Breakfast",

        "tags": ["Quick", "Vegetarian"],

        "favorite": true

    },

    ...

]

```



**GET /recipes/:id**



- Get recipe by id



Parameters:

- id: Recipe id

- token (optional): JWT for personalized data



Response:

```

{

    "id": 1,

    "title": "Avocado Toast",

    "description": "Simple and nutritious breakfast",

    "ingredients": [...],

    "instructions": [...],

    "nutritionInfo": {...},

    "category": "Breakfast",

    "tags": ["Quick", "Vegetarian"],

    "favorite": true

}

```



**POST /mealplans**



- Create a meal plan entry



Parameters:

- token: JWT of the logged in user

- date: Date for the meal

- meal: Meal type (breakfast, lunch, dinner, snack)

- recipeId: ID of the recipe



Response:

```

{

    "id": 1,

    "date": "2025-05-01",

    "meal": "breakfast",

    "recipe": {

        "id": 1,

        "title": "Avocado Toast",

        "nutritionInfo": {...}

    }

}

```



**GET /nutrition/log**



- Get nutrition logs for a user



Parameters:

- token: JWT of the logged in user

- startDate: Start date for logs

- endDate: End date for logs



Response:

```

[

    {

        "date": "2025-05-01",

        "calories": 2100,

        "protein": 95,

        "carbs": 240,

        "fat": 70,

        "meals": [...]

    },

    ...

]

```



**POST /users/register**



- Add a user account



Parameters:

- email: User's email

- password: User's provided password

- name: User's name

- preferences: Dietary preferences



Response:

```

{

    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."

}

```



**POST /users/login**



- Login a user



Parameters:

- email: User's email

- password: User's provided password



Response:

```

{

    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."

}

```



### Auth



- JWT auth

    - Store JWT in localStorage, remove when a user logs out

    - Include JWT in API requests that require authentication

    - Protected routes for authenticated users



## Roadmap



- Create client

    - React project with Redux setup and component hierarchy

    - Design system using Tailwind CSS



- Create server

    - Express project with routing and MongoDB connection

    - Authentication middleware setup



- Create database models

    - User model

    - Recipe model

    - Meal plan model

    - Nutrition log model



- Gather recipe data for initial database



- Deploy client and server projects



- Feature: User authentication

    - Implement register page + form

    - Implement login page + form

    - Create authentication endpoints

    - Setup JWT storage and usage



- Feature: Recipe management

    - Implement recipe browser

    - Create recipe search and filter functionality

    - Implement recipe detail view



- Feature: Meal planning

    - Create interactive calendar component

    - Implement drag-and-drop meal assignment

    - Create meal plan persistence



- Feature: Nutrition tracking

    - Implement daily nutrition dashboard

    - Create nutrition logging functionality

    - Develop nutritional calculations



- Feature: Analytics

    - Create data visualization components

    - Implement trend analysis

    - Build customizable reports



- Feature: Shopping list

    - Create automatic list generation

    - Implement list management features



- Bug fixes and optimization



- DEMO DAY



## Nice-to-haves



- Recipe import from URLs

- Meal sharing with other users

- Barcode scanning for food items

- Personalized recipe recommendations

- Integration with fitness tracking apps

- Meal prep instructions and timelines

- Nutritional goal recommendations based on user profile

- Advanced dietary restriction filters

- AI-powered meal suggestions