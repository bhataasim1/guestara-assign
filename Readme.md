# Guestara Assignment

Create a Nodejs backend server for menu management.
The menu will be divided into 3 parts in the following order:
Category
Sub Category: A category can have multiple sub-categories
Items: A Subcategory can have multiple items in it

## Installation

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. create a `.env` file in the root directory and add the following variables

```
DATABASE_URL="mysql://username:password@localhost:3306/guestara"
PORT=3000
HOST="http://localhost"
```

4. create a folder named `public/uploads` in the root directory to store the images
5. Run `pnpm run prisma` to initialize the database and generate the client
6. Run `pnpm run migrate` to run the migrations.
7. Run `pnpm run dev` to start the server

## API Endpoints Postman Collection

[Postman API Documentation](https://documenter.getpostman.com/view/30510479/2sA3s7iUQh)

## Short Answer Questions

1. Which database you have chosen and why?

I chose MySQL with Prisma as the ORM for this assignment. MySQL is a robust, well-established relational database that works well for structured data like categories, subcategories, and items. Prisma provides a type-safe database client that integrates seamlessly with TypeScript, making it easier to manage database operations and maintain code quality.

2. Three (3) things that you learned from this assignment?

While the assignment was relatively straightforward due to my previous experience, I might have:

a. Reinforced my understanding of structuring a Node.js/Express.js application with TypeScript and Prisma.

b. Gained more practice in implementing class-based services and controllers for better code organization.

c. Explored my knowledge of handling relations between entities (categories, subcategories, and items) in a structured API.

3. What was the most difficult part of the assignment?

As I mentioned, the most challenging aspect was likely handling the relations between entities. Ensuring that categories, subcategories, and items are properly linked and that operations (like creating or deleting) maintain data integrity across these relations can be complex.

4. What you would have done differently given more time?

Given more time, you might consider:

a. Implementing more robust error handling and input validation.

b. Implementing pagination.

c. Adding authentication and authorization to secure the API.

d. Creating a more comprehensive documentation, perhaps using tools like Swagger for API documentation.
