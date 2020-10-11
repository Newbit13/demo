import React from 'react'
import {Link} from 'react-router-dom';

import {routeConfig} from './route.config';

export default ()=>{
    return (
        <div>
            {
                routeConfig.map((v)=>(
                    <button key={v.path}>
                        <Link to={v.path}>
                            {v.name}
                        </Link>
                    </button>
                ))
            }
        </div>
    )
}