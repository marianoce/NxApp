import { types } from "../types/types";

const initialState = {
    configUsuarioCategoria: ''
}

export const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.configGetLoaded:
            return {
                ...state,
                configUsuarioCategoria: action.payload
            }
        case types.configUserChangeAdd:
            return {
                ...state,
                configUsuarioCategoria: (!state.configUsuarioCategoria ? '' : state.configUsuarioCategoria) + (!state.configUsuarioCategoria ? '' : ',') + action.payload
            }
        case types.configUserChangeDelete:
            return {
                ...state,
                configUsuarioCategoria: (state.configUsuarioCategoria.indexOf(',' + action.payload) >= 0 ? state.configUsuarioCategoria.replace(',' + action.payload, '') : state.configUsuarioCategoria.replace(action.payload, ''))
            }
        default:
            return state;
    }
}