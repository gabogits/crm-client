import React, { useContext, useState, useEffect } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const ProductoResumen = ({ producto }) => {
  const pedidoContext = useContext(PedidoContext);
  const { cantidadProductos, actualizarTotal } = pedidoContext;
  const [cantidad, setCantidad] = useState(0);
  useEffect(() => {
    actualizarCantidad();
    actualizarTotal();
  }, [cantidad]);

  const actualizarCantidad = () => {
    const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
    cantidadProductos(nuevoProducto);
  };

  const { nombre, precio } = producto;

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{nombre}</p>
        <p>$ {precio}</p>
      </div>

      <input
        type="number"
        placeholder="Cantidad"
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={(e) => setCantidad(e.target.value)}
        value={cantidad}
      />
  
    </div>



  );
};

export default ProductoResumen;


/*
<style>

.container-cmp.validacion-mati {
}

.head-cmp {
}

.logo-mati {
}

.content-cmp {
}

.cards-cmp {
}

.card-cmp.detection-alt {
}

.help-info {
}

.card-cmp-img {
}

.card-cmp-txt {
}

.card-cmp-txt-unit {
}

.cmp-accordions {
}

.cmp-accordion.red-value {
}

.cmp-accordion-head {
}

.cmp-accordion-content {
}

</style>
    <section class="container-cmp validacion-mati">
        <div class="head-cmp">
          <h3>Validación mati</h3>
          <div class="logo-mati">
            <figure>
              <img src="logo.svg" />
            </figure>
          </div>
        </div>

        <div class="content-cmp">
          <div class="cards-cmp">
            <div class="card-cmp detection-alt">
              <div class="help-info"></div>
              <div class="card-cmp-img "></div>
              <div class="card-cmp-txt">
                <div class="card-cmp-txt-unit">
                  <h4>Detección de alteraciones</h4>
                  <p>Alterado</p>
                </div>
                <div class="card-cmp-txt-unit"></div>
              </div>
            </div>
          </div>

          <div class="cmp-accordions">
            <div class="cmp-accordion red-value">
              <div class="cmp-accordion-head">
                <h4>Validación CURP</h4>
                <h6>No encontrada</h6>
              </div>
              <div class="cmp-accordion-content">
                <p>
                  El servicio CURP devolvió un error. El número CURP u otros
                  datos no son válidos. Por favor revise el documento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      */

      