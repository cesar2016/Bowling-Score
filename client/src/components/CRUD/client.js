import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { AddBox } from '@material-ui/icons'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import './client.css';


const theme = createMuiTheme({
    palette: {
      secondary: { main: '#1faa00'},
    },
  });

function NewClient() {
    const [state, setState] = useState({});

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    
    return (
        <div className='formUser'>
            <form className='contenedorInputs'>

                <TextField style={{ margin: '1%' }} id="outlined-basic"
                    label="Nombre" name='nombre' variant="outlined" size='small' onChange={(e) => handleChange(e)} />

                <TextField style={{ margin: '1%' }} id="outlined-basic"
                    label="DNI" name='DNI' variant="outlined" size='small' onChange={(e) => handleChange(e)} />

                <TextField style={{ margin: '1%' }} id="outlined-basic"
                    label="E-mail" name='email' variant="outlined" size='small' onChange={(e) => handleChange(e)} />

            </form>
            <ThemeProvider theme={theme}>
            <Button variant='contained' 
            style={{position: 'relative', marginLeft: '17%', marginTop: '2%'}}
            color='secondary' 
            startIcon={<AddBox/>} /* onClick={() => handleSubmit()} */ >AGREGAR</Button>
            </ThemeProvider>
        </div>
    )
}

export default connect(null, null)(NewClient)