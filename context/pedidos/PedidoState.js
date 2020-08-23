import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  ACTUALIZAR_TOTAL
} from "../../types";

const PedidoState = ({children}) => {
  const initialState = {
    cliente: {},
    productos: [],
    total: 0
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);
  const agregarCliente = (cliente) => {
    //console.log(cliente)
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  //modifica los productos
  const agregarProducto = productosSeleccionados => {
    console.log(productosSeleccionados)
    let nuevoState;
    if(state.productos.length > 0 ) {
      if(productosSeleccionados) {
        nuevoState = productosSeleccionados.map(producto => {
          const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id)
          return {
            ...producto, ...nuevoObjeto
          }
  
        })
      }else {
        nuevoState= []
      }
     
    }else {
      nuevoState = productosSeleccionados;
    }
   dispatch({
     type:SELECCIONAR_PRODUCTO,
     payload: nuevoState
   })
  }
  //Modifica las cantidades de los productos
  const cantidadProductos = nuevoProducto => {

    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: nuevoProducto
    })

  } 

  const actualizarTotal = () =>{
    console.log("actulizando...")
    dispatch({
      type:ACTUALIZAR_TOTAL
    })
  }
  return (
    <PedidoContext.Provider
      value={{
        cliente: state.cliente,
        productos: state.productos,
        total: state.total,
        agregarCliente,
        agregarProducto,
        cantidadProductos,
        actualizarTotal,
        
      }}
    >{children}</PedidoContext.Provider>
  );
};


export default PedidoState;
