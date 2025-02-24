import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchGradeBook
} from '../../requests/wilma-api';
import { handleError } from '../errors/errorSlice';


export const getGradebook = createAsyncThunk(
    'grades/getGradebook',
    async (options, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const grades = thunkAPI.getState().grades;
            
            if(grades.hasLoaded) return resolve({changed: false})
            
            const auth = options['auth'];
            
            fetchGradeBook(auth)
                .then(grades => {
                    return resolve({changed: true, grades: grades});
                })
                .catch(err => {
                    thunkAPI.dispatch(handleError(err))
                    return reject();
                })
        });
    }
)

export const gradeSlice = createSlice({
    name: 'grades',
    initialState: {
        subjects: {},
        grades: {},
        overview: {},
        isLoading: false,
        hasLoaded: false,
    },
    reducers: {},
    extraReducers: {
        [getGradebook.fulfilled]: (state, action) => {
            if(!action.payload.changed) {
                state.isLoading = false;
                return;
            };

            const grades = action.payload.grades;
            
            state.overview = grades['overview'];
            delete grades['overview'];

            Object.keys(grades).forEach(subject => {
                const {grade, points, courses} = grades[subject];
                
                state.subjects[subject] = {
                    grade: grade,
                    points: points
                }

                Object.keys(courses).forEach(code => {
                    const course = courses[code];
                    state.grades[code] = course;
                })
            })
            state.isLoading = false;
            state.hasLoaded = true;
        },
        [getGradebook.rejected]: (state, action) => {
            
            state.isLoading = false;
        },
        [getGradebook.pending]: (state, action) => {
            state.isLoading = true;
        }
    },
});

export const useGrades = (state) => ({
    subjects: state.grades.subjects,
    grades: state.grades.grades,
    overview: state.grades.overview,
    isLoading: state.grades.isLoading,
    hasLoaded: state.grades.hasLoaded,
});

export default gradeSlice.reducer;
