import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth } from '../../features/authentication/authSlice';
import { useErrors } from '../../features/errors/errorSlice';

import Frontpage from '../Frontpage/Frontpage';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import ThemeProvider from '../ThemeProvider/ThemeProvider';
import Gradebook from '../Gradebook/Gradebook';
import Messages from '../Messages/Messages';
import News from '../News/News';
import CourseTray from '../CourseTray/CourseTray';
import Teachers from '../Teachers/Teachers';
import Settings from '../Settings/Settings';
import Error from '../Error/Error';

import {
    BrowserRouter,
    Routes,
    Route,
    Router,
} from "react-router-dom";

function App() {
    const auth = useSelector(useAuth);
    const errors = useSelector(useErrors);

    if(errors.fatal) return <Error />
    
    return (
        <BrowserRouter>
            <ThemeProvider>
                {auth.token ? <Navbar /> : <></>}
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={auth.token ? <Frontpage /> : <Login />} />
                    <Route path='/messages' element={auth.token ? <Messages /> : <Login />} />
                    <Route path='/messages/:id' element={auth.token ? <Messages /> : <Login />} />
                    <Route path='/grades' element={auth.token ? <Gradebook /> : <Login />} />
                    <Route path='/news' element={auth.token ? <News /> : <Login />} />
                    <Route path='/news/:id' element={auth.token ? <News /> : <Login />} />
                    <Route path='/tray' element={auth.token ? <CourseTray /> : <Login />} />
                    <Route path='/teachers' element={auth.token ? <Teachers /> : <Login />} />
                    <Route path='/teachers/:id' element={auth.token ? <Teachers /> : <Login />} />
                    <Route path='/settings' element={auth.token ? <Settings /> : <Login />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
    
}

export default App;
