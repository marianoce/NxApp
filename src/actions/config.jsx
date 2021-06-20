import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchConToken } from '../helper/fetch';

//Obtengo la info de la configuracion
export const configGetLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('config/usuarioCategoria');
            const body = await resp.json();
            const configUsuarioCategoria = body.categorias; //plural o singular??? corregir el backend
            console.log(configUsuarioCategoria);
            dispatch(configGetLoaded(configUsuarioCategoria))
        } catch (error) {
            console.log(error)
        }
    }
};

const configGetLoaded = (configUsuarioCategoria) => ({
    type: types.configGetLoaded,
    payload: configUsuarioCategoria
});


export const configUserChange = (add, codigo) => {
    return (dispatch) => {
        if (add)
            dispatch(configUserChangeAdd(codigo));
        else
            dispatch(configUserChangeDelete(codigo));
    }
}

const configUserChangeAdd = (codigo) => ({
    type: types.configUserChangeAdd,
    payload: codigo
});

const configUserChangeDelete = (codigo) => ({
    type: types.configUserChangeDelete,
    payload: codigo
});


//Actualizo la configuracion
export const configStartUpdate = (thread) => {
    return async (dispatch, getState) => {

        Swal.fire({
            title: 'Guardando...',
            text: 'Espera un toque...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.hideLoading();
            }
        });

        /*
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
        */
    }
}

const configUpdated = (configUsuarioCategoria) => ({
    type: types.threadAddNew,
    payload: configUsuarioCategoria
});
