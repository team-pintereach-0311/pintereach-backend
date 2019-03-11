This doesn't need to be followed exactly. It's just to help get things started and hopefully point in the right direction
You can edit this as you see fit also if you want to clarify anything just reach out

##### Git Instructions

- Every backend developer will be working in this repo, but on separate branches.

- After git cloning THIS repo:
   - `git checkout master` <---- Puts you on master branch.

   - You may need to `git pull` before creating a new branch. <--- Git pull fetches and downloads from the branch you are in and merges    it with local repo
   
  - `git branch [firstname-lastname]` <-----  Creates the branch with your first and last name as branch name. 
     
  - `git checkout [firstname-lastname]` <---- Switches your working directory into your newly created branch.
  
  - `git push -u origin [firstname-lastname]` <-- Pushes that branch to GitHub.
      - Subsequent pushes after the above push can be done with `git push [firstname-lastname]`.
   
   - You can then `git commit` into that branch with all your changes.

   - **Once you have a fully functional feature:**
      -  `git pull origin master` <---- Merges your branch to the master repo.
      -  We will help resolve merge conflicts if they come up.


# Table of Contents

- [Reference Links](#Reference)
- [Tech Stack](#TechStack)
- [Project Summary](#ProjectSummary)
- [/Endpoints (For Frontend Usage)](#FrontEnd)
  - [Auth](#AuthEnd)
  - [Users](#UsersEnd)
  - [Categories](#CategoriesEnd)
- [Table Schema](#TableSchema)

# Reference Links <a name="Reference"></a>

- [policies and procedures](https://www.notion.so/Policies-and-Procedures-19e679fc1a284b668d8132dd8d7228cd)
- [Build week Schedule and Daily Milestones](https://www.notion.so/Build-week-Schedule-and-Daily-Milestones-7f0aca2ad598459fa4492fdac9881d5b)

# Tech Stack <a name="TechStack"></a>

- git - Command line tool used for version control.
- github - Webhosting site for containing repositories and supporting git commands.
- Javascript - Language/Files used.
- Node - Shorthand for NodeJS,
- Nodemon - Used for Development: Identifies changes made to your code upon saving, and restarts the server.
- Express - Sets up your index/server, middleware, routes, and endpoints.
- Morgan - Logging system for console logging things ran on backend.
- Helmet - Hides your techstack in the header front end.
- Cors - allows multiple outside connections to get access via different url/ports.
- knex - Handles Migration Tables, Seeds, Creates database file through client, provides query methods for server endpoints.
- sqlite3 - Generates Local Database File.

# Project Summary <a name="ProjectSummary"></a>

As a researcher, it's difficult to keep track of articles you want to read later. Pintereach helps you research by enabling you to save and organize articles in to categories to read later.

# /Endpoints (For Frontend Usage) <a name="FrontEnd"></a>

## Global CRUD Rules

- GET: Always Returns Array

- Requires AUTHENTICATION: Valid Token passed in Header

- Response Returns: if the value of the key(in the object) is empty, an empty string `""` will be returned as the key's value `{ key: "" }`

---

> /auth <a name="AuthEnd"></a>

- [ ] POST `/auth/register`


- [ ] POST `/auth/login`



> /users <a name="UsersEnd"></a>

- [ ] GET `/users` Requires AUTHORIZATION
- Explanation: returns all users


- [ ] Extra GET `/users/:id` Require AUTHORIZATION AND AUTHENTICATION(admin and/or self-user only)

- Explanation: returns single user
- Rule: User is only able to view user attributes if they belong to user logged in. Admin can view user attributes of any user.


- [ ] GET `/users/:id/articles`

- Explanation: Returns a single user with all articles


- [ ] Post `/users/articles` Requires AUTHORIZATION

- Explanation: add article to your user board
- Rule: Can only add articles on your own user boards... not other use boards (this includes admins)


- [ ] Post `/users/:id/categories` Requires AUTHORIZATION and AUTHENTICATION

- Explanation: Creates a category
- Rule: `user_id` must match the user `:id` in the url


- [ ] PUT `/users/:userid/articles/:id` Requires AUTHORIZATION

- Explanation: edits the article that belongs to the user
- Rule: You must be the owner of the article or an admin to edit it
- Rule2: If you provide the categories array, you must ALSO provide the category_id's that were already stored in the backend IF YOU       WANT TO KEEP THEM. (examples: `current -> changes -> result... ([1, 3] -> [2] -> [2]) || ([1,3] -> [1,2,3] -> [1,2,3])`)


- [ ] Extra DELETE `/users/:id` Requires AUTHORIZATION

- Explanation: remove your own user account from the database
- Note: Only SAME USER or ADMIN can delete the user account (not other users)


- [ ] DELETE `/users/:userid/articles/:id'` Requires AUTHORIZATION

- Explanation: remove a single article from the user board
- Note: Can only delete an article belonging to your own user account (unless you are admin)


> Categories <a name="CategoriesEnd"></a>

- [ ] GET `/categories` Requires AUTHORIZATION
- Explanation: Returns the names of all the articles


- [ ] Extra GET `/categories/:id` Requires AUTHORIZATION
- Explanation: Returns the category details


- [ ] Extra PUT `/categories/:id` Requires AUTHORIZATION and AUTHENTICATION
- Explanation - removes categories and the relationships they have to articles on user boards



- [ ] Extra DELETE `/categories/:id` Requires AUTHORIZATION and AUTHENTICATION
- Explanation - removes categories and the relationships they have to articles on user boards



# Possible Table Schema <a name="TableSchema"></a>

## users

| Field        | Data Type                          |
| ------------ | ---------------------------------- |
| id           | Int (auto increment)               |
| is_admin     | boolean (optional) (default false) |
| username     | String (unique) (required)         |
| display_name | String (optional)                  |
| password     | String (required)                  |
| email        | String (optional)                  |
| img_url      | String (optional)                  |

## articles

| Field      | Data Type (requires at **LEAST** title **OR** link) |
| ---------- | --------------------------------------------------- |
| id         | Int (auto increment)                                |
| user_id    | Foreign Key (points to id of users table)           |
| title      | String (optional1)                                  |
| cover_page | String (optional2)                                  |
| link       | Text (optional3)                                    |

## categories

| Field   | Data Type                  |
| ------- | -------------------------- |
| id      | Int (auto increment)       |
| user_id | Int (Required) (Unique)    |
| name    | String (Required) (Unique) |

## articles_categories_relationship

| Field         | Data Type                                      |
| ------------- | ---------------------------------------------- |
| id            | Int (auto increment)                           |
| articles_id   | Foreign Key (points to id of articles table)   |
| categories_id | Foreign Key (points to id of categories table) |

