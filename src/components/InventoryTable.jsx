import ProductRow from './ProductRow';

function InventoryTable({ products, onCambiarStock }) {
  const thClass = 'bg-green-700 text-white px-3 py-2.5 text-left';

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className={thClass}>Producto</th>
            <th className={thClass}>Marca</th>
            <th className={thClass}>Tipo</th>
            <th className={thClass}>Precio</th>
            <th className={thClass}>Stock</th>
            <th className={thClass}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((producto) => (
            <ProductRow key={producto.id} producto={producto} onCambiarStock={onCambiarStock} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
