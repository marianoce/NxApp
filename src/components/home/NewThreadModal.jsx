import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

//Estilos
import '../../styles/modal.scss';
import { modalStyle } from '../../helper/modal-style';
import '../../styles/galeria.scss';

//Acciones
import { uiCloseNewThreadModal } from '../../actions/ui';
import { threadStartAddNew } from '../../actions/thread';

//Enums
import { categoriasEnum, aliasTipoEnum } from '../../helper/enums'

Modal.setAppElement('#root');

const emptyForm = {
    titulo: '',
    contenido: '',
    img: '',
    imgUrl: '',
    aliasTipo: '',
    categoria: ''
};

export const NewThreadModal = () => {

    const dispatch = useDispatch();
    const { modalNewThreadOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState(emptyForm);

    const { titulo, contenido, img, imgUrl, aliasTipo, categoria } = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(uiCloseNewThreadModal());
    };

    const afterOpenModal = () => {
        setFormValues(emptyForm);
    };

    const handleSubirImagen = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormValues({
                ...formValues,
                imgUrl: URL.createObjectURL(file),
                img: file
            });
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (titulo.length === 0)
            return Swal.fire('Error', 'Debe de ingresar un titulo', 'error');
        if (titulo.length > 90)
            return Swal.fire('Error', 'El titulo excede el limite', 'error');
        if (contenido.length === 0)
            return Swal.fire('Error', 'Debe de ingresar una descripcion', 'error');
        if (contenido.length > 1300)
            return Swal.fire('Error', 'La descripcion excede el limite', 'error');
        if (aliasTipo === '')
            return Swal.fire('Error', 'Debe de seleccionar un alias', 'error');
        if (categoria === '')
            return Swal.fire('Error', 'Debe de seleccionar una categoria', 'error');

        dispatch(threadStartAddNew(formValues));
    }

    return (
        <Modal
          isOpen={ modalNewThreadOpen }
          onAfterOpen={afterOpenModal}
          onRequestClose={ closeModal }
          style={ modalStyle }
          contentLabel="Example Modal"
          closeTimeoutMS={200}
          className="modal"
          overlayClassName="modal-fondo"
        >
            <div className="modal-header">
                <h5 className="modal-title">Nuevo post</h5>
                <button type="button" className="close" onClick={ closeModal } aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <form
                className="modal-body"
                onSubmit={ handleFormSubmit }
            >
                <input id="fileSelector" type="file" name="file" style={{display: 'none'}} onChange={ handleFileChange } accept=".gif,.jpg,.jpeg,.png" />
                <div className="form-group">
                    <label>Titulo y descripcion</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Escriba el titulo"
                        name="titulo"
                        autoComplete="off"
                        value={titulo}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Descripcion"
                        rows="5"
                        name="contenido"
                        value={contenido}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <select className="form-control" name="aliasTipo" value={aliasTipo} onChange={handleInputChange}>
                        <option value="">Seleccione un alias</option>
                        {
                            aliasTipoEnum.map(p => (
                                <option key={p.key} value={p.value}> {p.desc}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <select className="form-control" name="categoria" value={categoria} onChange={handleInputChange}>
                        <option value="">Seleccione una categoria</option>
                        {
                            categoriasEnum.map(p => (
                                <option key={p.key} value={p.value}> {p.codigo} - {p.desc}</option>
                            ))
                        }
                    </select>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-info btn-block"
                    onClick={handleSubirImagen}
                >
                    <span>Subir imagen</span>
                </button>
                <small id="emailHelp" className="form-text text-muted">La imagen debe tener al menos 600x600</small>

                <hr/>

                <div className="form-group" id="imagenNewThread">
                    <img src={imgUrl}/>
                </div>
                <hr/>

                <button
                    type="submit"
                    className="btn btn-info btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Crear</span>
                </button>
            </form>
        </Modal>
    )
}
