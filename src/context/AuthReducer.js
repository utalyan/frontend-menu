const initialState = {
    isLogged:false,
    token:null,
    username:null,
    surname:null,
    telephone:null,
    firmName:null,
    logo:null
}

export const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case 'LOGIN_UPDATE':
        return { ...state, ...payload }

    default:
        return state
    }
}
