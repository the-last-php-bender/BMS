import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Book from '../models/book';
import fs from 'fs';
import path from 'path';

// Connect to the database before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || '', {
   
  });
});

// Close the database connection after running tests
afterAll(async () => {
  await mongoose.connection.close();
});
const createBook = async () => {
    const book = new Book({
        title: 'Test Book',
        author: 'John Doe',
        publishedDate: '2023-01-01',
        ISBN: '1234567890',
    });
    await book.save();
    return book;
};


describe('Books API', () => {
  let bookId: string;

  // Clean up the database before each test
  beforeEach(async () => {
    
    await Book.deleteMany({});
  });

  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        author: 'John Doe',
        publishedDate: '2023-01-01',
        ISBN: '1234567890',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test Book');
    bookId = res.body._id;
  });

  it('should fetch all books', async () => {
    const book = new Book({
      title: 'Test Book',
      author: 'John Doe',
      publishedDate: '2023-01-01',
      ISBN: '1234567890',
    });
    await book.save();

    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('title', 'Test Book');
  });

  it('should fetch a single book by ID', async () => {
    const book = new Book({
      title: 'Test Book',
      author: 'John Doe',
      publishedDate: '2023-01-01',
      ISBN: '1234567890',
    });
    await book.save();

    const res = await request(app).get(`/api/books/${book._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test Book');
  });

  it('should update a book', async () => {
    const book = new Book({
      title: 'Test Book',
      author: 'John Doe',
      publishedDate: '2023-01-01',
      ISBN: '1234567890',
    });
    await book.save();

    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .send({
        title: 'Updated Book',
        author: 'Jane Doe',
        publishedDate: '2023-02-01',
        ISBN: '0987654321',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Book');
  });

  it('should delete a book', async () => {
    const book = new Book({
      title: 'Test Book',
      author: 'John Doe',
      publishedDate: '2023-01-01',
      ISBN: '1234567890',
    });
    await book.save();

    const res = await request(app).delete(`/api/books/${book._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Book deleted successfully');
  });

  it('should update the book cover image', async () => {
    // Create a dummy book
    const book = await createBook();
    // console.log(book);

  
    const coverImagePath = path.join(__dirname, 'test-cover-image.jpg');
    fs.writeFileSync(coverImagePath, 'test image content'); // Simulate file content


    const res = await request(app)
        .patch(`/api/books/cover-image/${book._id}`)
        .attach('coverImage', coverImagePath); 
        console.log(res.statusCode) // Ensure 'coverImage' matches your field name

    // expect(res.statusCode).toEqual(200);

    // Clean up the temporary file
    fs.unlinkSync(coverImagePath);
});
});