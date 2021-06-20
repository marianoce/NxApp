import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

//Estilos
import '../../styles/modal.scss';

//Actions
import { uiCloseLoginModal } from '../../actions/ui';
import { startLogin } from '../../actions/auth';

Modal.setAppElement('#root');

const initLoginData = {
    email: '',
    password: ''
}

export const LoginModal = () => {

    const dispatch = useDispatch();
    const { modalLoginOpen } = useSelector(state => state.ui);
    const [formValues, setFormValues] = useState(initLoginData);

    const { email, password } = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(uiCloseLoginModal());
    };

    const afterOpenModal = () => {
        setFormValues({
            email: '',
            password: ''
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(email, password));
    }

    return (
        <Modal
          isOpen={ modalLoginOpen }
          onAfterOpen={ afterOpenModal }
          onRequestClose={ closeModal }
          contentLabel="Example Modal"
          closeTimeoutMS={200}
          className="modalSmall"
          overlayClassName="modal-fondo"
        >
            <div className="modal-header">
                <h5 className="modal-title">Ingresar</h5>
                <button type="button" className="close" onClick={ closeModal } aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form
                className="modal-body"
                onSubmit={ handleFormSubmit }
            >

                <div className="form-group">
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
                    onClick={handleLogin}
                >
                    <span> Ingresar</span>
                </button>
            </form>
        </Modal>
    )
}
