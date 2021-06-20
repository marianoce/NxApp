import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { threadGetLoading } from '../../actions/thread';
import { ThreadComentario } from './ThreadComentario';
import { ThreadNewComentario } from './ThreadNewComentario';
import { ThreadPrecomentario } from './ThreadPrecomentario';
import '../../styles/comentario.scss';
import { getCategoriaCodigo } from '../../helper/enums';
import { calcularFecha } from '../../helper/calcularFecha';

export const ThreadScreen = (props) => {

    let threadId = props.location.state;
    
    //Datos del thread
    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    const { activeThread } = useSelector(state => state.thread);
    const { titulo, contenido, img, fechaCreacion, comentarios, cantComentarios, categoria } = activeThread;
    const categoriaCodigo = categoria != '' ? getCategoriaCodigo(categoria) : '';

    useEffect(() => {
        dispatch(threadGetLoading(threadId));
    }, [dispatch]);

    //Si no hay ID -> A la home
    if(!threadId) {
        return <Redirect to="/" />;
    } else {
        threadId = props.location.state._id;
    }

    //Obtengo la fecha de cada comentario y el thread!.
    const { tiempo, formato } = calcularFecha(fechaCreacion);

    const contenedorStyle = {
        background:'rgba(0,0,0,.2)'
    };

    return (
        <div className="row min-vh-100 bg-dark animate__animated animate__fadeIn no-gutters text-white">
            <div className="col-12 col-sm-12 col-lg-7 mt-3 rounded border-dark" style={contenedorStyle}>
                <div className="col-12 col-sm-12 col-lg-6 mb-3 mt-3">
                    <i className="fas fa-comment"></i> { cantComentarios } - Hace: { tiempo } { formato }, [{ categoriaCodigo }]
                    <h3 className="mt-2">{ titulo }</h3>
                </div>
                <div className="col-12 col-sm-12 col-lg-12">
                    <img className="col-6 col-sm-12 rounded float-left pull-left mr-1 imgThread" src={img}></img>
                    <p className="text-justify">{ contenido }</p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-lg-5 mt-3">
                {
                    uid &&
                    <ThreadNewComentario threadId={threadId}></ThreadNewComentario>
                }
                {
                    <div className="col-12 mb-1">
                        <ThreadPrecomentario></ThreadPrecomentario>
                    </div>
                }
                <div className="col-12 mb-5">
                    {
                        comentarios &&
                        comentarios.map(comentario => (
                            <ThreadComentario key={ comentario._id } { ...comentario } esFlotante={false}>
                            </ThreadComentario>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
