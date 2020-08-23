import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProductos from "../components/pedidos/AsignarProductos";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";

import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

//context de pedidos
import PedidoContext from "../context/pedidos/PedidoContext";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const OBTENER_PEDIDOS = gql`
  query {
    obtenerPedidosVendedor {
      id
    }
  }
`;

const NuevoPedido = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);

  //utilizar context y extraer sus funciones y valores

  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: { nuevoPedido } }) {
      if (cache.data.data.ROOT_QUERY.obtenerPedidosVendedor) {
        const { obtenerPedidosVendedor } = cache.readQuery({
          query: OBTENER_PEDIDOS,
        });

        cache.writeQuery({
          query: OBTENER_PEDIDOS,
          data: {
            obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido],
          },
        });
      }
    },
  });
  const validarPedido = () => {
    //este array method productos.every sirve para que cada elemento del array cumpla con la condicion dada, en este caso que la candidad de cada producto sea mayor a 0
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  const crearNuevoPedido = async () => {
    const { id } = cliente;
    //Remover lo no deseado de productos

    const pedido = productos.map(
      ({ existencia, __typename, ...producto }) => producto
    ); //con esto estamos sacando estas propiedades del objeto, en este caso existencia

    console.log(pedido);
    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido,
          },
        },
      });
      console.log(data);
      router.push("/pedidos");
      //Mostrar alertas

      Swal.fire("Correcto", "El pedido se registró correctamente", "success");
    } catch (error) {
      console.log(error, "error");
      setMensaje(error.message.replace("GraphQL error: ", ""));

      setTimeout(() => {
        setMensaje("");
      }, 3000);
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto ">
        <p>{mensaje} </p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>

      {mensaje && mostrarMensaje()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />
          <button
            type="button"
            className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()} `}
            onClick={() => crearNuevoPedido()}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;

/*
ejemplo de react select
  const options = [
    { id: "chocolate", nombre: "Chocolate" },
    { id: "strawberry", nombre: "Strawberry" },
    { id: "vanilla", nombre: "Vanilla" },
  ];


  const [sabores, setSabores] = useState([]);
  const seccionarSabor = (sabores) => {
    setSabores(sabores);
  };
  useEffect(() => {
    console.log(sabores);
  }, [sabores]);

  <Select
        options={options}
        isMulti={true}
        onChange={(opcion) => seccionarSabor(opcion)} //para setear un state local
        getOptionValue= {opciones => opciones.id} //el componente espera un objeto con una propiedad value, pero nosotros podriamos sobrescribirla con otra propiedad en este caso id
        getOptionLabel= {opciones => opciones.nombre} //aqui espera label como propiedad y la sobreescribimos como nombre
        placeholder="seleccione el sabor"
        noOptionsMessage= {()=> "No hay resultados"} // por si no hay resultados
      />

*/
