import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketList from './TicketList';
import TicketEdit from "./TicketEdit";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path='/ticket' exact={true} element={<TicketList/>}/>
                <Route path='/ticket/:id' exact={true} element={<TicketEdit/>}/>
            </Routes>
        </Router>
    )
}

export default App;