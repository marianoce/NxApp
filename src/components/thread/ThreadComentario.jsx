import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {
    Link,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller
  } from "react-scroll";
import { calcularFecha } from '../../helper/calcularFecha';
import { comentarioFlotanteShow, comentarioNuevoAppend, comentarioSeleccionar } from '../../actions/comentario';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/comentario.scss';
import { youTubeGetID } from '../../helper/youtube';

export const ThreadComentario = ({
    _id,
    alias,
    contenido,
    fechaCreacion,
    img,
    rand,
    vid,
    esFlotante
}) => {

    //Hooks
    const dispatch = useDispatch();
    const { activeThread, comentarioSelec } = useSelector(state => state.thread);

    //Calculo la fecha del comentario
    const { tiempo, formato } = calcularFecha(fechaCreacion);

    //Funciones
    const handleRndClick = () => {
        dispatch(comentarioNuevoAppend(rand));
    };

    //Eventos
    Events.scrollEvent.register('begin', function(to, element) {
        dispatch(comentarioSeleccionar(to));
    });


    //Variables
    let comentariosRefArray = [];
    let contenidoParseado = '';

    const parsearComentario = (cont) => {
        let links = [];
        let index = 0;
        let startIndex = 0;

        while ((index = cont.indexOf('>>', startIndex)) > -1) {
            links.push(cont.substring(index, index + 13));
            startIndex = index + 2;
        }

        return links;
    };

    if (contenido)
        contenidoParseado = parsearComentario(contenido);

    if (activeThread && rand) {
        activeThread.comentarios.map(comentario => {
            if (comentario.contenido.indexOf(rand) >= 0) {
                comentariosRefArray.push(comentario.rand);
            }
        })
    }

    const procesarComentario = (cont) => {
        if (cont && contenidoParseado.indexOf(cont) >= 0) {
            const comentario = cont.substring(2,13);
            const uniqueid = Math.random();
            return <Link key={uniqueid} activeClass="active" className="fuenteLinkComentario" offset={-58} to={comentario} spy={true} smooth={true} duration={500}
                    onMouseEnter={() => { handleMouseOver(comentario) }} onMouseLeave={() => { handleMouseOver('') }}>
                        {cont}
                    </Link>;
        } else if (cont && cont.indexOf('(link)') > -1) {
            return <a key={Math.random} href={'//' + cont.substring(6, cont.length)} target="_blank">{cont.substring(6, cont.length)}</a>
        } else if (cont && cont.indexOf('(yutub)') > -1) {
            const youtubeUrl = cont.substring(6, cont.length);
            return <a className="comentarioVideo embed-responsive">
                        <iframe src={'https://www.youtube.com/embed/' + youTubeGetID(youtubeUrl)}></iframe>
                    </a>
        } else {
            return cont;
        }
    };

    const handleMouseOver = (comentario) => {
        let d = document.getElementById('divComent' + rand);
        let coords = d.getBoundingClientRect();
        dispatch(comentarioFlotanteShow(comentario,
                                        coords.right - coords.x + 40,
                                        coords.y));
    }

    return (
        <div id={'divComent' + rand} className={ rand === comentarioSelec ? 'card bg-dark fondo-oscuro-comentario-seleccionado mb-3' : 'card bg-dark fondo-oscuro-comentario mb-3' }>
            <Element name={rand} className="element"></Element>
            <div className="p-3">
                <div className="text-muted">
                    <div className="float-left">
                        <a className="text-muted fuenteLinkComentario" onClick={ handleRndClick }>{ rand }</a>
                    </div>
                    <div className="float-right">
                        { tiempo } { formato } 
                        <a className="ml-2 text-muted"><i className="fas fa-ellipsis-v"></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>

                <small className="mb">
                    {
                        comentariosRefArray.reverse().map(comentario => 
                            <Link key={Math.random()} onMouseEnter={() => { handleMouseOver(comentario) }} onMouseLeave={() => { handleMouseOver('') }} onMouseOut={() => { handleMouseOver('') }} offset={-58} activeClass="active" className="fuenteLinkComentario" to={comentario} spy={true} smooth={true} duration={500}>  {'>>' + comentario}</Link>
                        )
                    }
                </small>

                <div className="mt-1" id="imagen">
                    {
                        (
                            esFlotante && img &&
                            <img className="rounded float-left pull-left mr-2 imgComentarioFlotante" src={img}></img>
                        )
                        ||
                        (
                            !esFlotante && img &&
                            <img className="rounded float-left pull-left mr-2" src={img}></img>
                        )
                    }
                    {
                        (
                            esFlotante && vid &&
                            <div className="comentarioVideo embed-responsive">
                                <video controls>
                                    <source src={vid} type="video/mp4" />
                                    Actualiza el navegador
                                </video>
                            </div>
                        )
                        ||
                        (
                            !esFlotante && vid &&
                            <div className="comentarioVideo embed-responsive">
                                <video controls>
                                    <source src={vid} type="video/mp4" />
                                    Actualiza el navegador
                                </video>
                            </div>
                        )
                    }
                    <p className="fuente mb-0">
                        {
                            contenido.split(/([>][>][a-zA-Z0-9]{11})|([(][l][i][n][k][)].*)|([(][y][u][t][u][b][)].*)/g).map(p => procesarComentario(p))
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
