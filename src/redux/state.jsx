import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    subjects: [],
    schedules: []
}

export const subjectSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSubjects: (state, action) => {
            state.subjects = action.payload
        },
        setSchedules: (state, action) => {
            state.schedules = action.payload
        }
    }
})

export const { setSubjects, setSchedules } = subjectSlice.actions
export default subjectSlice.reducer