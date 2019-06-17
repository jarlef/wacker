import React, { useState } from 'react';
import { Wrapper, Content, Title, Section } from './App.styles';
import Form from 'wacker-examples-mono-repo-lib';

const App = () => {
    
    return (
        <Wrapper>
            <Content>
                <Title>Hello mono repo</Title><br />
                <Section> 
                    <Form />
                </Section>
            </Content>
        </Wrapper>
    );
}

export default App;