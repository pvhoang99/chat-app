import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./component/home/Home";
import Login from "./component/login/Login";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";

function App() {

    const {isLoggedIn} = useSelector(state => state.auth);
    useEffect(() => {

        if (!isLoggedIn) {

        }

    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
