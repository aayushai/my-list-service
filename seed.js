const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  genre: String,
  releaseYear: Number,
});

const tvShowSchema = new mongoose.Schema({
  _id: String,
  title: String,
  genre: String,
  seasons: Number,
});

const Movie = mongoose.model('Movie', movieSchema);
const TVShow = mongoose.model('TVShow', tvShowSchema);

const movies = [
  { _id: 'movie1', title: 'Inception', genre: 'SciFi', releaseYear: 2010 },
  { _id: 'movie2', title: 'The Dark Knight', genre: 'Action', releaseYear: 2008 },
  { _id: 'movie3', title: 'Interstellar', genre: 'SciFi', releaseYear: 2014 },
];

const tvShows = [
  { _id: 'tvshow1', title: 'Breaking Bad', genre: 'Drama', seasons: 5 },
  { _id: 'tvshow2', title: 'Game of Thrones', genre: 'Fantasy', seasons: 8 },
  { _id: 'tvshow3', title: 'Stranger Things', genre: 'SciFi', seasons: 4 },
];

async function seedDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Movie.deleteMany({});
    await TVShow.deleteMany({});

    await Movie.insertMany(movies);
    await TVShow.insertMany(tvShows);

    console.log('Data inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

seedDB();
