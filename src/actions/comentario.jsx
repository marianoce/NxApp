import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchConToken, fetchConTokenFormData } from '../helper/fetch';


//Creo un nuevo thread
export const comentarioStartAddNew = (comentario) => {
    return async (dispatch, getState) => {

        const { nuevoComentario } = getState().thread;
        if (nuevoComentario.length === 0)
            return Swal.fire('Error', 'Debe de ingresar un comentario', 'error');
        if (nuevoComentario.length > 1300)
            return Swal.fire('Error', 'El comentario excede el limite', 'error');

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
            //Ahora que subio, creo el comentario.
            const newComentario = {
                contenido: nuevoComentario,
                img: '',
                idImg: '',
                vid: '',
                idVid: '',
                thread: comentario.thread
            }

            if (comentario.img) {
                let formData = new FormData();
                formData.append('file', comentario.img);

                //Subo la imagen.
                const respImg = await fetchConTokenFormData('upload', formData, 'POST');
                const bodyImg = await respImg.json();
                newComentario.img = bodyImg.url;
                newComentario.idImg = bodyImg.idFile;
            } else if (comentario.vid) {
                let formData = new FormData();
                formData.append('file', comentario.vid);

                //Subo el video.
                const respFile = await fetchConTokenFormData('upload', formData, 'POST');
                const bodyFile = await respFile.json();
                newComentario.vid = bodyFile.url;
                newComentario.idVid = bodyFile.idFile;
            }
            
            const resp = await fetchConToken('thread/comentario', newComentario, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch(comentarioAddNew(body.comentario));
            } else {
                err = 'Error: ' + body.msg;
            }
        } catch (error) {
            err = 'error: ' + error;
        } finally {
            Swal.close();
            if (err === '') {
                Swal.fire('Ok', 'El comentario fue creado exitosamente', 'success');
            } else {
                Swal.fire('Error', err, 'error');
            }
        }
    }
}

const comentarioAddNew = (comentario) => ({
    type: types.comentarioAddNew,
    payload: comentario
});



//Cambios sobre el nuevo comentario
export const comentarioNuevoChange = (comentario) => ({
    type: types.comentarioNuevoChange,
    payload: comentario
});

export const comentarioNuevoAppend = (comentario) => ({
    type: types.comentarioNuevoAppend,
    payload: comentario
});

export const comentarioSeleccionar = (comentario) => ({
    type: types.comentarioSeleccionar,
    payload: comentario
});

export const comentarioDeseleccionar = (comentario) => ({
    type: types.comentarioDeseleccionar,
    payload: comentario
});





//Cambios sobre el comentario flotante
export const comentarioFlotanteShow = (comentario, offsetX, offsetY) => {
    return (dispatch) => {
        if (comentario !== '') {
            dispatch(comentarioOpenFlotante(comentario, offsetX, offsetY))
        }
        else {
            dispatch(comentarioCloseFlotante(comentario, offsetX, offsetY))
        }
    }
};

export const comentarioOpenFlotante = (comentario, offsetX, offsetY) => ({
    type: types.comentarioOpenFlotante,
    payload: {
        comentario,
        offsetX,
        offsetY
    }
});


export const comentarioCloseFlotante = (comentario, offsetX, offsetY) => ({
    type: types.comentarioCloseFlotante,
    payload: {
        comentario,
        offsetX,
        offsetY
    }
});