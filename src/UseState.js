import React, { useEffect, useState } from "react";

const SECURITY_CODE = "urrego"

function UseState({ name }){
    const [state, setState] = useState({
        value:``,
        error:false,
        loading:false,
        delete:false,
        confirm:false,
    })

    const onConfirm =()=>{
        setState({
            ...state,
            error:false,
            loading:false,
            confirm: true,
        })
    }

    const onError = () =>{
        setState({
            ...state,
            error:true,
            loading:false,
            value:``
        })
    }

    const onWrite = (newValue) =>{
        setState({...state, 
            value: newValue,
        })
    }

    const onCheck = () =>{
        setState({ ...state, loading:true , error:false });
    }

    const onDelete = () =>{
        setState({
            ...state,
            delete:true,
            loading:false,
            value:``
        })
    }

    const onBack = () =>{
        setState({
            ...state,
            confirm:false,
            delete:false,
            value:``
        })
    }

    useEffect(()=>{
        if(state.loading){
            setTimeout(()=>{
                if(state.value === SECURITY_CODE){
                   onConfirm();
                } else {
                    onError();
                }

            },1000)
        }
    }, [state.loading]);

   if(!state.confirm && !state.delete){
    return(
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por Favor escribe el codigo de seguridad</p>
            {state.error && (
                <p>Error: el codigo es incorrecto</p>
            )}
            {state.loading && (
                <p>Cargando...</p>
            )}
            <input 
                placeholder="Codigo de seguridad"
                value={state.value}
                onChange = {(e)=>{
                   onWrite(e.target.value)
                }}
            />
            <button onClick={()=>{
                onCheck();
            }}
            >Comprobar</button>
        </div>
    )
   } else if(state.confirm && !state.delete){
        return(
            <React.Fragment>
            <p>¿Seguro que quieres eliminar {name}?</p>
            <button onClick={()=>{
               onDelete();
            }}
            >Si,eliminar</button>

            <button
            onClick={()=>{
                onBack()
            }}
            >No,volver</button>
        </React.Fragment>
        )
   } else{
        return(
            <React.Fragment>
            <p>eliminado con exito</p>
            <button onClick={()=>{
                onBack();
            }}>volver al inicio</button>
        </React.Fragment>
        )
   }
}

export { UseState }