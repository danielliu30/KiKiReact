import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/Verified.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';

function Verified() {

    const [validate, setValidate] = useState(false);
    const [buttonValidate, setButtonValidate] = useState(false);
    const queryString = window.location.pathname.split('/').pop();

    useEffect(() => {
        if (buttonValidate) {
            fetch("http://localhost:8080/customer/verifiedToken-" + queryString)
                .then(response => response.json())
                .then((result) => {
                    //setValidate(result),
                    setButtonValidate(false)
                })
            if (validate) {
                return (
                    <div>
                        <script>
                            function myFunction() {
                                alert("Account is Verified!")
                            }
                        </script>
                    </div>
                )
            } else {
                return (
                    <div>
                        <script>
                            function myFunction() {
                                alert("Account NOT verified : token invalid")
                            }
                        </script>
                    </div>
                )
            }
        }
    }, [buttonValidate]);



    if (!buttonValidate) {
        return (
            <div className="row d-flex justify-content-center">
                <div className="text-center">
                    <Button onClick={() => setButtonValidate(true)}>Verify</Button>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <Verified />,
    document.getElementById('root')
);

export default Verified
