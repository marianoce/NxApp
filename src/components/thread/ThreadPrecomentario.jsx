import React from 'react';
import {
    Link,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller
  } from "react-scroll";
import { useSelector } from 'react-redux';
import '../../styles/comentario.scss';

export const ThreadPrecomentario = () => {
    //Hooks
    const { threads, activeThread, comentarioSelec } = useSelector(state => state.thread);

    return (
        <div className="card bg-dark mb-3 fondo-oscuro-comentario">
            <div className="p-3">
                <div className="">
                    <div className="float-left">
                        Comentarios: { activeThread.cantComentarios }
                    </div>
                    <div className="float-right">
                        {
                            activeThread.cantComentarios > 0 &&
                            <a className="fuenteLinkComentario" onClick={() => scroll.scrollToBottom()}>Bajar abajo</a>
                        }
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    )
}
