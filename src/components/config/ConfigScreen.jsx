import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriasEnum } from '../../helper/enums';
import { configGetLoading, configUserChange, configStartUpdate } from '../../actions/config';

export const ConfigScreen = () => {

    const dispatch = useDispatch();
    const { configUsuarioCategoria } = useSelector(state => state.config);

    useEffect(() => {
        dispatch(configGetLoading());
    }, [dispatch]);


    const handleCheckBoxChange = ({target}) => {
        dispatch(configUserChange(target.checked, target.id));
    };

    const handleGuardarConfig = () => {
        dispatch(configStartUpdate());
    };

    return (
        <>
            <div className="container">
            <h4 className="text-white mt-2">Configuración</h4>
            <small className="text-white">Por defecto estan habilitadas todas</small>
            <div className="row bg-dark mt-4 ml-2 text-white animate__animated animate__fadeIn">
                {
                    categoriasEnum.map(p => (
                        <div id={p.key} className="col-12 col-sm-2 col-lg-3 custom-control custom-switch">
                            <input id={p.codigo} type="checkbox" className="custom-control-input" defaultChecked={configUsuarioCategoria?.includes(p.codigo)} onChange={handleCheckBoxChange} />
                            <label id={p.value} className={`custom-control-label ${configUsuarioCategoria?.includes(p.codigo) ? '' : 'text-muted' }`} htmlFor={p.codigo}>
                                { p.desc + ' - ' + p.codigo }
                            </label>
                        </div>
                    ))
                }
            </div>

            <button
                type="submit"
                className="btn btn-info btn-lg float-right mt-3"
                onClick={handleGuardarConfig}
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>
            </div>
        </>
    )
}
