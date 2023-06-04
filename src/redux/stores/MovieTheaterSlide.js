import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    movieTheaters: []
}

export const MovieTheaterSlide = createSlice({
    name: 'movieTheater',
    initialState,
    reducers: {
        getListMovieTheater: (state, action) => {
            state.movieTheaters = action.payload
        }
    }
});

export const { getListMovieTheater } = MovieTheaterSlide.actions;

export default MovieTheaterSlide.reducer;