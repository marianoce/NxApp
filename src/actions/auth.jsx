import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helper/fetch';
import { types } from '../types/types';
import { uiCloseLoginModal, uiCloseRegisterModal } from './ui';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
            dispatch(uiCloseLoginModal());
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/nuevo', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(uiCloseRegisterModal());
            Swal.fire('Registrado exitosamente!', 'Recibiras un email en tu correo para confirmar la registracion.', 'success');
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renuevo');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
        //dispatch(eventLogout()); aca hay que limpiar datos, OJO!!!!!.
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const logout = () => ({ type: types.authLogout });
