import {configureStore, createSlice} from "@reduxjs/toolkit"


const initialState = localStorage.getItem("loginState")? JSON.parse(localStorage.getItem("loginState")):{
    userID : null,
    userName: null,
    email: null,
    token: null,
    isLogged: false,
    gamesArray:[]
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return (action.payload)
        },
        
        signOut: (state, action) =>{
            localStorage.removeItem("loginState");
            return{
                gamesArray:[],
                userName: null,
                userID : null,
                email: null,
                token: null,
                isLogged: false,
            }
        },
        setLibrary: (state,action) =>{
            return{
                ...state,
                gamesArray: action.payload
            }
        },
        addGameToLibrary: (state,action) =>{

            return{
                ...state,
                gamesArray:[...state.gamesArray, action.payload]

            }
        }

    }



})

export const store = configureStore({
    reducer:loginSlice.reducer
})

store.subscribe(()=>{
    localStorage.setItem('loginState', JSON.stringify(store.getState()))
  })

