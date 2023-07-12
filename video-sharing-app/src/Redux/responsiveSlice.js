import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    menu: true,
}


const responsiveSlice = createSlice({
    name : "menu",
    initialState,
    reducers : {
       toggle: (state) => {
        state.menu = !(state.menu)
       }
    }

})

export const {toggle} = responsiveSlice.actions
export default responsiveSlice.reducer