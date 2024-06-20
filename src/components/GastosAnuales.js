import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const items = [
  { name: 'utilesEscolares', label: 'Lista de útiles escolares', description: 'Gastos por compra de materiales y útiles escolares' },
  { name: 'cumpleanos', label: 'Cumpleaños', description: 'Gastos para los preparativos y celebración de cumpleaños' },
  { name: 'navidad', label: 'Navidad', description: 'Gastos para los preparativos y regalos de navidad' },
  { name: 'fiestasPatrias', label: 'Fiestas patrias', description: 'Gastos para celebración de fiestas patrias' },
  { name: 'pascuaResurreccion', label: 'Pascua de resurrección', description: 'Gastos para celebración de festividad' },
  { name: 'halloween', label: 'Halloween', description: 'Gastos para celebración de festividad' },
  { name: 'diaNino', label: 'Día del niño', description: 'Gastos para la celebración de festividad' },
  { name: 'patenteAuto', label: 'Patente del auto', description: 'Pago de patente de vehículo familiar' },
  { name: 'mantencionAuto', label: 'Mantención de auto', description: 'Gastos por la mantención del vehículo por mecánico y pago de gastos periódicos como revisión técnica y otros.' },
  { name: 'odontologia', label: 'Odontología', description: 'Gastos médicos dedicados a la revisión semestral/anual de odontología' }
];

function GastosAnuales({ data, setData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      gastosAnuales: {
        ...prevData.gastosAnuales,
        [name]: parseFloat(value),
      }
    }));
  };

  return (
    <div>
      <h2>Gastos de una vez al año</h2>
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
                    value={data.gastosAnuales[item.name] || ''}
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

export default GastosAnuales;
