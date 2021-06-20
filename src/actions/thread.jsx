import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchConToken, fetchSinToken, fetchConTokenFormData } from '../helper/fetch';
import { uiCloseNewThreadModal } from './ui';


//Creo un nuevo thread
export const threadStartAddNew = (thread) => {
    return async (dispatch, getState) => {

        Swal.fire({
            title: 'Subiendo...',
            text: 'Espera un toque...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.hideLoading();
            }
        });

        let err = '';

        try {
            let formData = new FormData();
            formData.append('file', thread.img);

            //Subo la imagen.
            const respImg = await fetchConTokenFormData('upload', formData, 'POST');
            const bodyImg = await respImg.json();

            //Ahora que subio, creo el thread.
            const newThread = {
                titulo: thread.titulo,
                contenido: thread.contenido,
                img: bodyImg.url,
                idImg: bodyImg.idFile,
                categoria: thread.categoria,
                aliasTipo: thread.aliasTipo
            }
            const resp = await fetchConToken('thread/nuevo', newThread, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch(threadAddNew(body.thread));
                dispatch(uiCloseNewThreadModal());
            } else {
                err = 'Error: ' + body.msg;
            }
        } catch (error) {
            err = 'error: ' + error;
        } finally {
            Swal.close();
            if (err === '') {
                Swal.fire('Ok', 'El post fue creado exitosamente', 'success');
            } else {
                Swal.fire('Error', err, 'error');
            }
        }
    }
}

const threadAddNew = (thread) => ({
    type: types.threadAddNew,
    payload: thread
});



//Carga de threads
export const threadStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchSinToken('thread/');
            const body = await resp.json();
            const threads = body.thread; //plural o singular??? corregir el backend
            dispatch(threadLoaded(threads))
        } catch (error) {
            console.log(error)
        }
    }
};

const threadLoaded = (threads) => ({
    type: types.threadLoaded,
    payload: threads
});




//Carga de UN thread
export const threadGetLoading = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchSinToken(`thread/${id}`);
            const body = await resp.json();
            const thread = body.thread; //plural o singular??? corregir el backend
            thread.comentarios = body.comentarios;
            dispatch(threadGetLoaded(thread))
        } catch (error) {
            console.log(error)
        }
    }
};

const threadGetLoaded = (thread) => ({
    type: types.threadGetLoaded,
    payload: thread
});