import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseRegisterModal } from '../../actions/ui';
import '../../styles/modal.scss';
import { startRegister } from '../../actions/auth';

Modal.setAppElement('#root');

export const RegisterModal = () => {

    const dispatch = useDispatch();
    const { modalRegisterOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '' //Despues poner las demas cosas
    });

    const { email, password } = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(uiCloseRegisterModal());
    };

    const afterOpenModal = () => {
        setFormValues({
            email: '',
            password: ''
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(startRegister(email, password));
        setFormValues({
            email: '',
            password: ''
        })
    }

    return (
        <Modal
          isOpen={ modalRegisterOpen }
          onAfterOpen={ afterOpenModal }
          onRequestClose={ closeModal }
          //style={ modalStyle }
          contentLabel="Example Modal"
          closeTimeoutMS={200}
          className="modalSmall"
          overlayClassName="modal-fondo"
          //portalClassName="modalSmall"
        >
            <div className="modal-header">
                <h5 className="modal-title">Registrarse</h5>
                <button type="button" className="close" onClick={ closeModal } aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form
                className="modal-body"
                onSubmit={ handleFormSubmit }
            >

<               div className="form-group">
                    <label>Email</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="pepito@tuhermana.com"
                        name="email"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="**********"
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-info btn-block"
                >
                    <span> Registrarse</span>
                </button>
            </form>
        </Modal>
    )
}
