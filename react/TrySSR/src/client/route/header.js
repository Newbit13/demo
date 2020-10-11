import React from 'react'
import {Link} from 'react-router-dom';

import {routeConfig} from './route.config';

export default ()=>{
    return (
        <div>
            {
                routeConfig.map((v)=>(
                    <Link key={v.path} to={v.path}>
                        {v.name}
                    </Link>
                ))
            }
        </div>
    )
}