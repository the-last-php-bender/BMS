import { Schema, model } from 'mongoose';

interface IBook {
    title: string;
    author: string;
    publishedDate: Date;
    ISBN: string;
    coverImage?: string;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    ISBN: { type: String, required: true },
    coverImage: { type: String },
});

const Book = model<IBook>('Book', bookSchema);

export default Book;
export { IBook };
