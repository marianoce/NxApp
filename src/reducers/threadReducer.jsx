import { types } from "../types/types";

const initialState = {
    threads: [],
    activeThread: {},
    nuevoComentario: '',
    comentarioSelec: '',
    comentarioFlotante: {}
}

export const threadReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.threadAddNew:
            return {
                ...state,
                threads: [action.payload, ...state.threads]
            }
        case types.threadLoaded:
            return {
                ...state,
                threads: [...action.payload]
            }
        case types.threadGetLoaded:
            return {
                ...state,
                activeThread: action.payload
            }
        case types.comentarioAddNew:
            return {
                ...state,
                nuevoComentario: '',
                activeThread: {
                    ...state.activeThread,
                    cantComentarios: state.activeThread.cantComentarios + 1,
                    comentarios: [action.payload, ...state.activeThread.comentarios]
                }
            }
        case types.comentarioNuevoChange:
            return {
                ...state,
                nuevoComentario: action.payload
            }
        case types.comentarioNuevoAppend:
                return {
                    ...state,
                    nuevoComentario: state.nuevoComentario + (state.nuevoComentario.length === 0 ? '>>' + action.payload : '\n>>' + action.payload)
                }
        case types.comentarioSeleccionar:
            return {
                ...state,
                comentarioSelec: action.payload
            }
        case types.comentarioDeseleccionar:
            return {
                ...state,
                comentarioSelec: ''
            }
        case types.comentarioOpenFlotante:
            return {
                ...state,
                comentarioFlotante: {
                    comentario: action.payload.comentario,
                    offsetX: action.payload.offsetX,
                    offsetY: action.payload.offsetY
                }
            }
        case types.comentarioCloseFlotante:
            return {
                ...state,
                comentarioFlotante: {
                    comentario: '',
                    offsetX: 0,
                    offsetY: 0
                }
            }
        default:
            return state;
    }
}