import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

function Verified() {

    const [validate, setValidate] = useState(false);
    const queryString = window.location.pathname.split('/').pop();
    useEffect(() => {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': "http://localhost:3000"
        //     },
        //     body: JSON.stringify(
        //         {
        //             email: email,
        //             name: password,
        //             member: member
        //         }
        //     )
        // };

        fetch("http://localhost:8080/customer/verifiedToken-" + queryString)
            .then(response => response.json())
            .then((result) => {
                setValidate(result)
            })
    }, []);

    if(validate){
        return (
            <div>
                Verified
            </div>
        )
    }else{
        return(
            <div>Invalid Token</div>
        )
    }
   
}

ReactDOM.render(
    <Verified />,
    document.getElementById('root')
);

export default Verified
