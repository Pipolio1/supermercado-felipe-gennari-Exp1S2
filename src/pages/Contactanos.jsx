import { useState } from 'react';

function Contactanos() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  const inputClass =
    'w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700';

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Contáctanos</h2>
      <p className="mb-4 text-slate-600">
        ¿Tienes dudas, sugerencias o reclamos? Escríbenos y te responderemos a la brevedad.
      </p>

      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <p><strong>Teléfono:</strong> +56 2 2345 6789</p>
        <p><strong>Correo:</strong> contacto@supermercadofelipe.cl</p>
        <p><strong>Horario de atención:</strong> Lunes a viernes, 09:00 - 18:00</p>
      </div>

      {enviado ? (
        <p className="bg-green-100 border border-green-700 rounded-lg p-4 text-green-900">
          ¡Gracias por escribirnos! Tu mensaje fue enviado correctamente.
        </p>
      ) : (
        <form
          className="flex flex-col gap-2 bg-white rounded-lg shadow p-5"
          onSubmit={handleSubmit}
        >
          <label className="font-medium text-slate-700" htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" required className={inputClass} />

          <label className="font-medium text-slate-700" htmlFor="correo">Correo electrónico</label>
          <input id="correo" name="correo" type="email" required className={inputClass} />

          <label className="font-medium text-slate-700" htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="5" required className={inputClass} />

          <button
            type="submit"
            className="mt-2 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-md text-base"
          >
            Enviar mensaje
          </button>
        </form>
      )}
    </section>
  );
}

export default Contactanos;
