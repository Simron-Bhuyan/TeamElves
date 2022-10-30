import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './index.css'
ReactDOM.render (
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);
