 import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    loading: false,
    loadingforSignUp : false,
    error: false,
}

export const userSlice = createSlice({
    name:'currentUser',
    initialState,
    reducers: {

            signUpStart : (state) => {
                    state.loadingforSignUp = true
            },

            signUpSuccesful : (state) => {
                    state.loadingforSignUp = false
            },

            loginStart: (state) => {
                state.loading = true
            },
            loginSuccess: (state,action) => {
                state.loading = false
                state.currentUser = action.payload
            },
        
            loginFailure : (state,action) => {
                state.loading = false;
                state.error = action.payload
            },

            logout : (state) => {
                state.currentUser = null;
                state.loading = false;
                state.error = false;
            },

            subscription: (state, action) => {
                if(state.currentUser.subscribedUser?.includes(action.payload)){
                    state.currentUser.subscribedUser.splice(state.currentUser.subscribedUsers.findIndex(channelId => channelId ===action.payload),1)
                }else
                {
                    state.currentUser.subscribedUsers.push(action.payload)

                }
            }
    }

});


export const {signUpStart,signUpSuccesful,loginStart,loginSuccess,loginFailure,logout,subscription} = userSlice.actions


export default userSlice.reducer;