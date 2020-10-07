import React from 'react'
import ReactDOM from 'react-dom'

import Fruit from './pages/Fruit'


ReactDOM.hydrate(
    <Fruit />,
    document.getElementById('root')
);