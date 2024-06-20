import React from 'react';

function DatosGenerales({ data, setData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <div>
      <h2>Datos Generales</h2>
      <form>
        <div className="form-group">
          <label>Integrantes de grupo familiar</label>
          <input 
            type="number" 
            className="form-control" 
            name="integrantesFamilia" 
            value={data.integrantesFamilia} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Número de hijos</label>
          <input 
            type="number" 
            className="form-control" 
            name="numeroHijos" 
            value={data.numeroHijos} 
            onChange={handleChange} 
          />
        </div>
        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
          <button type="button" className="btn btn-primary" onClick={handleNext}>Siguiente</button>
        </div>
      </form>
    </div>
  );
}

export default DatosGenerales;
