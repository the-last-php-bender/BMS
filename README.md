
```markdown
# Books API
##Project details
Project description: An api that manages books along with authors.
Author: Nwinyinya David (the-last_php_bender)
Email: nwinyinyadavid123@gmail.com

## Project Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd books-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the `.env` file**:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Start the application**:
   ```bash
   npm start
   ```

## API Endpoints

- **Create a Book**: `POST /api/books`
  - **Request Body**:
    ```json
    {
      "title": "string",
      "author": "string",
      "publishedDate": "date",
      "ISBN": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "title": "string",
      "author": "string",
      "publishedDate": "date",
      "ISBN": "string"
    }
    ```

- **Get All Books**: `GET /api/books`
  - **Response**:
    ```json
    [
      {
        "_id": "string",
        "title": "string",
        "author": "string",
        "publishedDate": "date",
        "ISBN": "string"
      }
    ]
    ```

- **Get a Single Book**: `GET /api/books/:id`
  - **Response**:
    ```json
    {
      "_id": "string",
      "title": "string",
      "author": "string",
      "publishedDate": "date",
      "ISBN": "string"
    }
    ```

- **Update a Book**: `PUT /api/books/:id`
  - **Request Body**:
    ```json
    {
      "title": "string",
      "author": "string",
      "publishedDate": "date",
      "ISBN": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "title": "string",
      "author": "string",
      "publishedDate": "date",
      "ISBN": "string"
    }
    ```

- **Delete a Book**: `DELETE /api/books/:id`
  - **Response**:
    ```json
    {
      "message": "Book deleted successfully"
    }
    ```

- **Update Book Cover**: `PATCH /api/books/cover-image/:id`
  - **Request Body**: FormData with field `coverImage`
  - **Response**:
    ```json
    {
      "_id": "string",
      "title": "string",
      "author": "string",
      "publishedDate": "date",
      "ISBN": "string",
      "coverImage": "string"
    }
    ```

## Testing

To run tests:
```bash
npm test
```

### Test Example

- **Install testing libraries**:
  ```bash
  npm install jest supertest ts-jest @types/jest @types/supertest --save-dev
  ```

- **Configure Jest** in `package.json`:
  ```json
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testPathIgnorePatterns": ["/node_modules/"]
  }
  ```


## Directory Structure

```
books-api/
├── src/
│   ├── controllers/
│   │   └── bookController.ts
│   ├── models/
│   │   └── book.ts
│   ├── routes/
│   │   └── bookRoutes.ts
│   ├── middlewares/
│   │   └── upload.ts
│   ├── utils/
│   │   └── db.ts
│   └── app.ts
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Notes

- Ensure you have MongoDB running locally or use a cloud-based MongoDB service.
- The `uploads/` directory is where the book cover images will be stored. Ensure this directory exists or create it in your project root.
- Modify the `MONGO_URI` in your `.env` file to match your MongoDB connection string.
```