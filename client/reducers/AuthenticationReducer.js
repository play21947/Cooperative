const initialState = {
    user: null,
    loaded: false
}


const AuthenticationReducer=(state = initialState, action)=>{
    if(action.type === "LOGIN"){
        return{
            user: action.payload
        }
    }else if(action.type === "LOAD"){
        return{
            user: action.payload,
            loaded: true
        }
    }else if(action.type === "LOGOUT"){
        return{
            user: null,
            loaded: true
        }
    }else{
        return state
    }
}


export default AuthenticationReducer