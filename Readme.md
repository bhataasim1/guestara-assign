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
