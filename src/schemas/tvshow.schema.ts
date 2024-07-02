import { Schema, Document } from 'mongoose';

const Genre = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] as const;
type GenreType = typeof Genre[number];

const EpisodeSchema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }],
});

export const TVShowSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, enum: Genre }],
  episodes: [EpisodeSchema],
});

export interface TVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: GenreType[];
  episodes: Array<{
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
  }>;
}
