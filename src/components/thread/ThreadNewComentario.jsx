import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { comentarioStartAddNew, comentarioNuevoChange } from '../../actions/comentario';
import '../../styles/nuevoComentario.scss';

export const ThreadNewComentario = ({threadId}) => {

    const dispatch = useDispatch();
    const { nuevoComentario } = useSelector(state => state.thread);

    //Datos del comentario
    const [formValues, setFormValues] = useState({
        img: '',
        imgUrl: '',
        vid: '',
        vidUrl: '',
        thread: threadId
    });
    const { img, imgUrl, vid, vidUrl } = formValues;

    //Manejo la imagen.
    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //Valido el tamaño de la imagen
            if (((file.size / 1024) / 1024) > 5) {
                return Swal.fire('Error', 'La imagen debe ser menor a 5 MB', 'error');
            }

            setFormValues({
                ...formValues,
                imgUrl: URL.createObjectURL(file),
                img: file,
                vidUrl: '',
                vid: ''
            });
        }
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //Valido el tamaño de la imagen
            if (((file.size / 1024) / 1024) > 50) {
                return Swal.fire('Error', 'El video debe ser menor a 50 MB', 'error');
            }
            setFormValues({
                ...formValues,
                vidUrl: URL.createObjectURL(file),
                vid: file,
                imgUrl: '',
                img: ''
            });
        }
    }

    const handleSubirImagen = () => {
        document.querySelector('#imageSelector').click();
    }

    const handleSubirVideo = () => {
        document.querySelector('#videoSelector').click();
    }

    const handleNuevoComentario = () => {
        setFormValues({
            ...formValues,
            thread: threadId
        });

        dispatch(comentarioStartAddNew(formValues));
        
        setFormValues({
            img: '',
            imgUrl: '',
            vid: '',
            vidUrl: '',
            thread: threadId
        });
    }

    const handleContenidoChange = ({target}) => {
        dispatch(comentarioNuevoChange(target.value));
    }

    const handleClickClear = () => {
        setFormValues({
            ...formValues,
            img: '',
            imgUrl: '',
            vid: '',
            vidUrl: '',
        })
    }

    return (
        <>
            <input id="imageSelector" type="file" name="file" style={{display: 'none'}} onChange={ handleImagenChange } accept=".gif,.jpg,.jpeg,.png" />
            <input id="videoSelector" type="file" name="file" style={{display: 'none'}} onChange={ handleVideoChange } accept=".webm,.mp4" />
            <div className="col-12">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="comentario...."
                    rows="5"
                    value={nuevoComentario}
                    onChange={handleContenidoChange}
                ></textarea>
            </div>
            <div className="col-12 mb-3">
                {
                    imgUrl.length > 0 &&
                    <div className="divPreviewImagen mt-1">
                        <img src={imgUrl}/>
                        <div className="top-left" role="button" onClick={handleClickClear}>
                            <i className="far fa-trash-alt fa-3x text-danger ml-3 mt-1"></i>
                        </div>
                    </div>
                }

                {
                    vidUrl.length > 0 &&
                    <div className="divPreviewVideo mt-1 embed-responsive">
                        <video controls>
                                <source src={vidUrl} type="video/mp4" />
                                Actualiza el navegador
                        </video>
                        <div className="top-left" role="button" onClick={handleClickClear}>
                            <i className="far fa-trash-alt fa-3x text-danger ml-3 mt-1"></i>
                        </div>
                    </div>
                }

                <button type="button" onClick={handleSubirVideo} className="btn btn-info mr-1 mt-1">
                    <i className="fas fa-video"></i>
                </button>
                <button type="button" onClick={handleSubirImagen} className="btn btn-info mr-1 mt-1">
                    <i className="far fa-image"></i>
                </button>
                <button type="button" className="btn btn-info mt-1 float-right" onClick={handleNuevoComentario}>Comentar</button>
            </div>
        </>
    )
}
