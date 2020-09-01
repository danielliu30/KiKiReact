import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

function Verified(){
    return(
        <div>
            Verified
        </div>
    )
}

ReactDOM.render(
    <Verified />,
    document.getElementById('root')
);

export default Verified
