import React from 'react';

function InformacionPersonal({ data, setData, nextStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (data.nombre && data.correo) {
      nextStep();
    } else {
      alert('Por favor complete los campos obligatorios');
    }
  };

  return (
    <div>
      <h2>Información Personal</h2>
      <form>
        <div className="form-group">
          <label>Nombre *</label>
          <input 
            type="text" 
            className="form-control" 
            name="nombre" 
            value={data.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Correo *</label>
          <input 
            type="email" 
            className="form-control" 
            name="correo" 
            value={data.correo} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input 
            type="tel" 
            className="form-control" 
            name="telefono" 
            value={data.telefono} 
            onChange={handleChange} 
          />
        </div>
        <div className="button-group">
          <button type="button" className="btn btn-primary" onClick={handleNext}>Siguiente</button>
        </div>
      </form>
    </div>
  );
}

export default InformacionPersonal;
