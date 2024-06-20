import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const items = [
  { name: 'vestuario', label: 'Vestuario y artículos personales', description: 'Compra de ropa, vestuario, calzado.' },
  { name: 'matricula', label: 'Matrícula', description: 'Gastos de matrícula' },
  { name: 'colegiatura', label: 'Colegiatura', description: 'Pago de colegiatura mensual' },
  { name: 'otrosGastosEscolares', label: 'Otros Gastos escolares', description: 'Pago de cuotas y actividades academias varias' },
  { name: 'tallerAcademia', label: 'Taller o academia', description: 'Gastos asociados a actividades tales como futbol, ballet, piano u otras actividades relacionadas que tengan un pago requerido' },
  { name: 'transporteEscolar', label: 'Transporte escolar', description: 'Pago de transporte especial para el traslado del niño/a desde el hogar al colegio' },
  { name: 'materialesEscolares', label: 'Materiales escolares', description: 'Gastos asociados a materiales de estudio.' },
  { name: 'seguroMedico', label: 'Seguro médico', description: 'Gastos médicos en tratamiento' },
  { name: 'medicinasRemedios', label: 'Medicinas o remedios', description: 'Gastos médicos en tratamiento' },
  { name: 'consultaMedicoTratante', label: 'Consulta médico tratante', description: 'Consultas periódicas a médico tratante' },
  { name: 'recreacion', label: 'Recreación', description: 'Gastos dedicados a la recreación y esparcimiento' },
  { name: 'vacaciones', label: 'Vacaciones', description: 'Gastos dedicados a las vacaciones' },
  { name: 'articulosHigienePersonal', label: 'Artículos de higiene personal', description: 'Productos de higiene y aseo personal, peluquería, etc' }
];

function GastosHijos({ data, setData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      gastosHijos: {
        ...prevData.gastosHijos,
        [name]: parseFloat(value),
      }
    }));
  };

  return (
    <div>
      <h2>Gastos particulares de los hijos</h2>
      <form>
        <div className="row">
          {items.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${item.name}`}>{item.description}</Tooltip>}
              >
                <div className="form-group">
                  <label>{item.label}</label>
                  <input
                    type="number"
                    className="form-control"
                    name={item.name}
                    value={data.gastosHijos[item.name] || ''}
                    onChange={handleChange}
                  />
                </div>
              </OverlayTrigger>
            </div>
          ))}
        </div>
        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>Siguiente</button>
        </div>
      </form>
    </div>
  );
}

export default GastosHijos;
