
import Layout from "../components/Layout"
import Link from "next/link"
import {gql, useQuery } from '@apollo/client'
import {useRouter} from 'next/router'
import Cliente from "./../components/Cliente"
const OBTENER_CLIENTES_USUARIO =  gql`
query  obtenerClientesVendedor {
  obtenerClientesVendedor{
    id
    nombre
    apellido
    empresa
    email
  }
}
`;

const  Home = ()=> {
  const router = useRouter()
  //Consulta de Apollo

  const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO);
  //console.log(data)
  //console.log(loading)
  //console.log(error)

  if(loading) return 'Cargando....'; //es importante este cargando por que desconoce el valor de data en el primer render {data.obtenerClientesVendedor
  //esto va despues de recibir respuesta del servidor, despues de loading


  const vistaProtegida = () => {
    return  router.push('/login');
}
  return (
    
    <Layout>
        { data.obtenerClientesVendedor ? (
          <>
       <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
          <Link href="/nuevocliente">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">Nuevo Cliente</a>
          </Link>
          
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                  <th className="w-1/5 py-2">Nombre</th>
                  <th className="w-1/5 py-2">Empresa</th>
                  <th className="w-1/5 py-2">Email</th>
                  <th className="w-1/5 py-2">Eliminar</th>
                  <th className="w-1/5 py-2">Editar</th>
              </tr>
            </thead>

            <tbody className="bg-white">
      
              { data.obtenerClientesVendedor.map(cliente => (
                  <Cliente key={cliente.id} cliente={cliente} />
               
              ))}
            </tbody>
          </table>
        </div> </> ) :vistaProtegida ()}
    </Layout>
  )
}

export default Home;