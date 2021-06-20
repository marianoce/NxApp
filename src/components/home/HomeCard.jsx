import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoriaCodigo } from '../../helper/enums';

//Estilos
import '../../styles/galeria.scss';

export const HomeCard = ({
    _id,
    titulo,
    contenido,
    img,
    fechaCreacion,
    fechaUltimoComentario,
    sticky,
    cerrado,
    cantComentarios,
    categoria
}) => {

    const categoriaShort = getCategoriaCodigo(categoria);

    return (
        <div className="col-6 col-sm-4 col-lg-2 fuenteGaleria animate__animated animate__fadeIn">
            <Link to={{pathname: '/thread', state: { _id: _id }}}>
                <img className="w-100 darken" src={img}></img>
            </Link>
            <div className="top-left">
                { categoriaShort }
            </div>
            <div className="top-right">
                { cantComentarios }
            </div>
            <div className="bottom">
                <p>
                    {titulo}
                </p>
            </div>
        </div>
    )
}
