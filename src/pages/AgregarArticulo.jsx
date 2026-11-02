import { useState } from 'react';
import { useInventory, ACTIONS } from '../context/InventoryContext';
import { TIPOS_PRODUCTO } from '../data/products';

const formularioInicial = {
  nombre: '',
  marca: '',
  tipo: TIPOS_PRODUCTO[0],
  precio: '',
  stock: '',
};

function AgregarArticulo() {
  const { dispatch } = useInventory();
  const [form, setForm] = useState(formularioInicial);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.nombre.trim() === '' || form.marca.trim() === '') return;

    dispatch({
      type: ACTIONS.ADD_PRODUCT,
      payload: {
        id: Date.now(),
        nombre: form.nombre.trim(),
        marca: form.marca.trim(),
        tipo: form.tipo,
        precio: Number(form.precio),
        stock: Number(form.stock),
      },
    });

    setForm(formularioInicial);
    setEnviado(true);
  };

  const inputClass =
    'w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700';
  const labelClass = 'font-medium text-slate-700';

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Agregar artículo</h2>
      <p className="mb-4 text-slate-600">
        Ingresa un nuevo artículo al inventario del supermercado.
      </p>

      {enviado ? (
        <div className="bg-green-100 border border-green-700 rounded-lg p-4 text-green-900">
          <p>El artículo fue agregado correctamente al inventario.</p>
          <button
            onClick={() => setEnviado(false)}
            className="mt-3 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md"
          >
            Agregar otro artículo
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-white rounded-lg shadow p-5"
        >
          <label className={labelClass} htmlFor="nombre">Nombre del artículo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Yogur batido frutilla 1 kg"
            required
            className={inputClass}
          />

          <label className={labelClass} htmlFor="marca">Marca</label>
          <input
            id="marca"
            name="marca"
            type="text"
            value={form.marca}
            onChange={handleChange}
            placeholder="Ej: Soprole"
            required
            className={inputClass}
          />

          <label className={labelClass} htmlFor="tipo">Tipo de producto</label>
          <select
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className={inputClass}
          >
            {TIPOS_PRODUCTO.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <label className={labelClass} htmlFor="precio">Precio (CLP)</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            value={form.precio}
            onChange={handleChange}
            placeholder="Ej: 1990"
            required
            className={inputClass}
          />

          <label className={labelClass} htmlFor="stock">Stock inicial</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            placeholder="Ej: 10"
            required
            className={inputClass}
          />

          <button
            type="submit"
            className="mt-2 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-md text-base"
          >
            Agregar al inventario
          </button>
        </form>
      )}
    </section>
  );
}

export default AgregarArticulo;
