import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ThreadComentario } from './ThreadComentario';

//Estilos
import '../../styles/comentarioFlotante.scss';

export const ThreadComentarioFlotante = () => {

    //State
    const { comentario, offsetX, offsetY } = useSelector(state => state.thread.comentarioFlotante);
    const { activeThread } = useSelector(state => state.thread);

    //Variables
    let copyComentarioData = {};
    let modalFlotanteStyle = {};

    //Si esta activo el thread.
    if (activeThread && activeThread.comentarios) {
        const comentarioData = activeThread.comentarios.filter(p => p.rand === comentario)[0];
        if (comentarioData) {
            const { _id, alias, contenido, fechaCreacion, img, rand, vid } = comentarioData;
            copyComentarioData = {
                _id, alias, contenido, fechaCreacion, img, vid, rand: rand + 'float'
            }
        }
    }

    if (offsetY && offsetX) {
        modalFlotanteStyle = {
            top: offsetY + 'px',
            right: offsetX + 'px'
        };
    }

    return (
        <>
            {
                comentario &&
                (comentario.length > 0) &&
                <div className="modalFlotante animate__animated animate__fadeIn animate__faster text-white" id="modal" style={ modalFlotanteStyle }>
                    <ThreadComentario {...copyComentarioData} esFlotante={true} ></ThreadComentario>
                </div>
            }
        </>
    )
}
