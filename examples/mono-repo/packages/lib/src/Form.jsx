import React, { useState } from 'react';
import { Name, Input } from './Form.styles';

const Form = () => {

    const [ name, setName ] = useState('Mud'); 
    
    return (
        <div>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" /><br />
            My name is <Name>{name}</Name>!
            
        </div>
    );
}

export default Form;