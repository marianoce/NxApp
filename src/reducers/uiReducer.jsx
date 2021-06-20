import { types } from "../types/types";

const initialState = {
    modalNewThreadOpen: false,
    modalLoginOpen: false,
    modalRegisterOpen: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenNewThreadModal:
            return {
                ...state,
                modalNewThreadOpen: true
            }
        case types.uiCloseNewThreadModal:
            return {
                ...state,
                modalNewThreadOpen: false
            }
        case types.uiOpenLoginModal:
            return {
                ...state,
                modalLoginOpen: true
            }
        case types.uiCloseLoginModal:
            return {
                ...state,
                modalLoginOpen: false
            }
        case types.uiOpenRegisterModal:
            return {
                ...state,
                modalRegisterOpen: true
            }
        case types.uiCloseRegisterModal:
            return {
                ...state,
                modalRegisterOpen: false
            }
        default:
            return state;
    }
}