import { useInventory } from '../context/InventoryContext';
import { STOCK_BAJO } from '../constants';

function formatPrecio(precio) {
  return '$' + precio.toLocaleString('es-CL');
}

function ListadoArticulos() {
  const { products } = useInventory();

  const thClass = 'bg-green-700 text-white px-3 py-2.5 text-left';
  const tdClass = 'px-3 py-2.5 border-b border-slate-200';

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Listado de artículos</h2>
      <p className="mb-4 text-slate-600">
        Todos los artículos disponibles actualmente en el inventario.
      </p>

      {products.length === 0 ? (
        <p className="bg-white rounded-lg shadow p-4 text-slate-600">
          No hay artículos en el inventario.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className={thClass}>Nombre</th>
                <th className={thClass}>Marca</th>
                <th className={thClass}>Tipo</th>
                <th className={thClass}>Precio</th>
                <th className={thClass}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((producto) => {
                const stockBajo = producto.stock < STOCK_BAJO;
                return (
                  <tr key={producto.id} className={stockBajo ? 'bg-red-100' : ''}>
                    <td className={tdClass}>{producto.nombre}</td>
                    <td className={tdClass}>{producto.marca}</td>
                    <td className={tdClass}>{producto.tipo}</td>
                    <td className={tdClass}>{formatPrecio(producto.precio)}</td>
                    <td className={tdClass}>
                      {producto.stock}
                      {stockBajo && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs">
                          Stock bajo
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ListadoArticulos;
