import React, {Fragment, useState} from 'react';
import {v4 as uuid} from  'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //crear state de citas

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario:'',
        fecha: '',
        hora:'',
        sintomas:''
    });

    //otro state
    const [error, actualizarError] = useState(false)
    

    //funcion que se ejecuta cada vez que el usuario escribe en un input

    const actualizarState= e => {
        actualizarCita({
            ...cita, //array con copia de valores del state (guardamos los
            //valores ingresados en cada input, si no se pierden)
            //como name de cada input coincide con campos del state
            //estamos llenando cada campo dado por nombre del input elegido
            [e.target.name]: e.target.value
        })
        }

        
    //extraer valores 
    const { mascota, propietario, fecha , hora, sintomas} = cita;

    //cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();//previene la accion por defualt (get llena url con data)
        
        
        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        //eliminar mensaje error
        actualizarError(false);
        //asignar un id
        cita.id = uuid();

        // crear la cita
        crearCita(cita);
        //reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''            
        })
    }


    return (  
        <Fragment>
        <h2>Crear Cita</h2>
        {error ? <p className="alerta-error"> Todos los campos son obligatorios</p> : null}
        <form
            onSubmit={submitCita}
        >
            <label>Nombre Mascota</label>
            <input  
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
                value={mascota}
            />
            <label>Nombre Dueño</label>
            <input
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Dueño de la mascota"
                onChange={actualizarState}
                value={propietario}
            />
            <label> Fecha</label>
            <input
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
            />
            <label> Hora</label>
            <input
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={hora}
            />
            <label>Síntomas</label>
            <textarea 
                className="u-full-width"
                name="sintomas"
                onChange={actualizarState}
                value={sintomas}
            ></textarea>
            <button 
                type="submit"
                className="u-full-width button-primary"
            >Agregar Cita</button>
        </form>
        </Fragment>
        );
}
 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}


export default Formulario;