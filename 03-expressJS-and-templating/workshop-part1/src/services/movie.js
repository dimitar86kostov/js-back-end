const fs = require('fs/promises');
const { Movie } = require('../models/movies');

const filePath = './data/database.json';

async function readFile() {
    const data = await fs.readFile(filePath);

    return JSON.parse(data.toString());
};

async function writeFile(data) {
    await fs.writeFile(filePath, JSON.stringify(data));
};

function toMovieModel(data) {
    const movie = new Movie();

    movie.id = data.id;
    movie.title = data.title;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.year = data.year;
    movie.imageURL = data.imageURL;
    movie.rating = data.rating;
    movie.description = data.description;

    return movie;
}

async function getAllMovies() {
    const movies = await readFile();
    return movies.map(toMovieModel);
}

async function getMovieById(id) {
    const movies = await readFile();
    let movie = movies.find(m => m.id == id);

    return movie ? toMovieModel(movie) : movie;
}

async function createMovie(data) {

    const id = uuid();

    const movie = {
        id,
        title: data.title,
        genre: data.genre,
        director: data.director,
        year: Number(data.year),
        imageURL: data.imageURL,
        rating: Number(data.rating),
        description: data.description
    }

    const movies = await readFile();
    movies.push(movie);
    await writeFile(movies);

    return toMovieModel(movie);
}

function uuid() {
    // id generator
    return 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
}