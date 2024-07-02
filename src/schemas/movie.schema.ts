import { Schema, Document } from 'mongoose';

const Genre = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] as const;
type GenreType = typeof Genre[number];

export const MovieSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, enum: Genre }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }],
});

export interface Movie extends Document {
  id: string;
  title: string;
  description: string;
  genres: GenreType[];
  releaseDate: Date;
  director: string;
  actors: string[];
}
