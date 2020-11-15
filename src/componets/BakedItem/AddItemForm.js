//will want drop downs for categories
import React,{useState} from 'react'
import {FormLabel, FormGroup, FormControl, Button} from 'react-bootstrap'
function AddItemForm(){
    const[category,setCategory] = useState("");
    const[flavor, setFlavor] = useState("");
    const[size, setSize] = useState("");
    const[submit, setSubmit] = useState(false);

    function onClick() {
        setSubmit(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <div className="Item">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="Category">
                    <FormLabel>Category</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="Flavor" >
                    <FormLabel>Flavor</FormLabel>
                    <FormControl
                        value={flavor}
                        onChange={e => setFlavor(e.target.value)}
                        type="password"
                    />
                </FormGroup>

                <FormGroup controlId="Size">
                    <FormLabel>Size</FormLabel>
                    <FormControl
                        value={size}
                        type="select"
                        onChange={e => setSize(e.target.value)}
                    />
                </FormGroup>
                
                
                <Button block /* disabled={!validateForm()} */ onClick={onClick}>
                    Add Item
                </Button>
            </form>
        </div>
    );
}

export default AddItemForm;