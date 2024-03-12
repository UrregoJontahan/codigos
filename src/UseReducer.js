import React, { useEffect, useReducer, useState } from "react";

const SECURITY_CODE = "urrego"

const initialState = {
    value:"",
    error:false,
    loading:false,
    delete:false,
    confirm:false,
}

function UseReducer({ name }){

    const actionType = {
        confirm:"CONFIRM",
        error:"ERROR",
        check:"CHECK",
        write:"WRITE",
        delete:"DELETE",
        back:"BACK"
    }

    const onConfirm =()=>dispatch({ type: actionType.confirm })
    const onError = () =>dispatch({ type: actionType.error })
    const onCheck = () =>dispatch({ type: actionType.check })
    const onDelete = () =>dispatch({ type: actionType.delete })
    const onBack = () =>dispatch({ type: actionType.back })
    
    const onWrite = (newValue) =>{
        dispatch({ type: actionType.write , payload:newValue })
    }


    const reducerObj = (state, payload) => ({
        [actionType.confirm]:{
            ...state,
            error:false,
            loading:false,
            confirm: true,
        },
        [actionType.error]:{
            ...state,
            loading:false,
            error:true,
        },
        [actionType.check]: {
            ...state,
            loading:true,
        },
        [actionType.write]:{
            ...state, 
            value: payload,
        },
        [actionType.delete]:{
            ...state,
            delete:true,
            loading:false,
            value:``
        },
        [actionType.back]:{
            ...state,
            confirm:false,
            delete:false,
            value:``
        },
    })

    const reducer = (state, action) =>{
        if(reducerObj(state)[action.type]){
            return reducerObj(state, action.payload)[action.type]
        } else {
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer,initialState) 

    useEffect(()=>{
        if(state.loading){
            setTimeout(()=>{
                if(state.value === SECURITY_CODE){
                   onConfirm()
                } else {
                    onError()
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
            <button onClick={onCheck}>
                Comprobar
            </button>
        </div>
    )
   } else if(state.confirm && !state.delete){
        return(
            <React.Fragment>
            <p>¿Seguro que quieres eliminar {name}?</p>
            <button onClick={onDelete}>
                Si,eliminar
            </button>

            <button
            onClick={onBack}>
                No,volver
            </button>
        </React.Fragment>
        )
   } else{
        return(
            <React.Fragment>
            <p>eliminado con exito</p>
            <button onClick={onBack}>
                volver al inicio
            </button>
        </React.Fragment>
        )
   }

}

export { UseReducer }