import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import { uiOpenLoginModal, uiOpenNewThreadModal, uiOpenRegisterModal } from '../../actions/ui';
import '../../styles/navbar.scss';

export const Navbar = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);

    const handleNewThreadClick = (e) => {
        dispatch(uiOpenNewThreadModal());
    }
    
    const handleLoginClick = (e) => {
        dispatch(uiOpenLoginModal());
    }

    const handleRegisterClick = (e) => {
        dispatch(uiOpenRegisterModal());
    }

    const handleLogout = (e) => {
        dispatch(startLogout());
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark py-2 fondo-oscuro-navbar">
            <a className="navbar-brand fuenteNavbar" href="/">NX</a>
            <button className="navbar-toggler mb-1" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="navbarNavDropdown" aria-expanded="false">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto">
                    {
                        uid &&
                        <button className="btn btn-info mr-sm-1" data-toggle="collapse" data-target="#collapsibleNavbar" onClick={handleNewThreadClick} >
                            <i className="fas fa-plus-circle"></i>
                            <span> Nuevo </span>
                        </button>
                    }
                    <div className="form-inline">
                        <input className="form-control mr-sm-1" type="search" placeholder="Buscar" aria-label="Search"/>
                    </div>
                    {
                        uid &&
                        <Link to="/config" className="btn btn btn-outline-info mr-sm-1">
                            <i className="fas fa-cogs"></i>
                        </Link>
                    }
                    {
                        uid &&
                        <button className="btn btn-outline-info mr-sm-1" data-toggle="collapse" data-target="#collapsibleNavbar" onClick={handleLogout}>
                            <i className="fas fa-bell"></i>
                        </button>
                    }
                    {
                        uid &&
                        <button className="btn btn-outline-danger" data-toggle="collapse" data-target="#collapsibleNavbar" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span> Salir </span>
                        </button>
                    }
                    {
                        !uid &&
                        <button className="btn btn-outline-info" data-toggle="collapse" data-target="#collapsibleNavbar" onClick={handleRegisterClick}>
                            <i className="fas fa-user"></i>
                            <span> Registrarse </span>
                        </button>
                    }
                    {
                        !uid &&
                        <button className="btn btn-outline-info" data-toggle="collapse" data-target="#collapsibleNavbar" onClick={handleLoginClick}>
                            <i className="fas fa-sign-in-alt"></i>
                            <span> Ingresar </span>
                        </button>
                    }
                </ul>
            </div>
        </nav>
    )
}
