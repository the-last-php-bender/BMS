import { Request, Response } from 'express';
import Book, { IBook } from '../models/book';


export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, publishedDate, ISBN} = req.body;
        const book = new Book({ title, author, publishedDate, ISBN});
        await book.save();
        res.status(201).json(book);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};


export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};


export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};


export const updateBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};


export const updateBookCover = async (req: Request, res: Response) => {
    try {
        // Find the book by ID
        const book= await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if the file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Update the book's cover image
        book.coverImage = req.file.path;
        await book.save();

        // Respond with the updated book
        res.status(200).json(book);
        
    } catch (error: any) {
        // Handle any unexpected errors
        res.status(500).json({ error: error.message });
    }
};
