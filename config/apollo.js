import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"; //HttpLink para conectarme con mi servidor de apollo
import fetch from 'node-fetch'; //para consultar un servidor aparte 
import {setContext} from "apollo-link-context"
 
const HttpLink = createHttpLink({ //donde va encontarr los datos, donde se encuentra el servidor de apollo, donde esta instalado apollo server
    uri: 'http://localhost:4000/', //a donde se conecte
    fetch
})

const authLink =  setContext ((_, {headers}) => { // setContextnos va permitir modificar los headers que se envian
    //le pasamos los header nuevo
    
    //leer el storage

    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}`: ''
        }
    }
});

const client = new ApolloClient ({ //esto es lo minimo que se requiere para configura apollo cliente y que se pueda conectar a servidor
    cache: new InMemoryCache(), //Requerido para manejar el cache
    connectToDevTools: true,
    link: authLink.concat(HttpLink) //y asi conectamos con apollo client
});

export default client;