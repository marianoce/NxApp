import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { AboutScreen } from '../components/config/AboutScreen';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { HomeScreen } from '../components/home/HomeScreen';
import { ThreadScreen } from '../components/thread/ThreadScreen';
import { ConfigScreen } from '../components/config/ConfigScreen';
import { NewThreadModal } from '../components/home/NewThreadModal';
import { ThreadComentarioFlotante } from '../components/thread/ThreadComentarioFlotante';
import { Navbar } from '../components/ui/Navbar';
import ScrollerToTop from '../components/ui/ScrollerToTop';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch]);

    if (checking) {
        return <div className="bg-dark" style={{height: "100vh"}} ><h5 className="text-white pl-3 pt-2">Cargando <i className="fas fa-spinner fa-pulse"></i> </h5></div>
    }

    return (
        <Router>
            <ScrollerToTop/>
            <div className="bg-dark" style={{height: "100vh"}} >
                <Navbar />
                <Switch>
                    <Route exact path="/about" component={ AboutScreen } />
                    <Route exact path="/thread" component={ ThreadScreen } />
                    <Route exact path="/config" component={ ConfigScreen } />
                    <Route exact path="/" component={ HomeScreen } />
                    <Redirect to="/" />
                </Switch>
                <NewThreadModal />
                <LoginModal />
                <RegisterModal />
                <ThreadComentarioFlotante />
            </div>
        </Router>
    )
}
