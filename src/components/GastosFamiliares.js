import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const items = [
  { name: 'alimentacion', label: 'Alimentación', description: 'Compras de alimentos, colaciones, de manera periodica y especifica (ej: pan diario)' },
  { name: 'supermercado', label: 'Supermercado', description: 'Compras de la canasta basica del hogar.' },
  { name: 'feria', label: 'Feria', description: 'Compra de frutas y verduras' },
  { name: 'arriendo', label: 'Arriendo y/o dividendo', description: 'Pago de arriendo o dividendo de la vivienda' },
  { name: 'gastosComunes', label: 'Gastos comunes', description: 'Pago asociado a gastos comunes derivados de la vivienda' },
  { name: 'agua', label: 'Agua', description: 'Gastos básicos de pago de agua' },
  { name: 'luz', label: 'Luz', description: 'Gastos básicos de pago de luz' },
  { name: 'gas', label: 'Gas', description: 'Gastos básicos de pago de gas' },
  { name: 'internet', label: 'Internet', description: 'Pago asociado a la cuenta de internet del hogar.' },
  { name: 'tvCable', label: 'TV cable', description: 'Pago de servicio de tv por cable' },
  { name: 'telefono', label: 'Teléfono', description: 'Pago asociado a las cuentas telefono familiar' },
  { name: 'colaboracionDomestica', label: 'Colaboración doméstica', description: 'Pago a servicio o persona que ayuda con las tareas domesticas' },
  { name: 'entretenimientoInterior', label: 'Entretenimiento interior del hogar', description: 'Gastos de streming y plataformas de entretencion y/o juegos' },
  { name: 'entretenimientoExterior', label: 'Entretenimiento exterior', description: 'Salidas, cine, hobbies' },
  { name: 'transporte', label: 'Transporte', description: 'Combustible, transporte público, mantenimiento del vehículo familiar' },
  { name: 'tagAutopistas', label: 'Pago TAG autopistas', description: 'Pago de peajes de autopista' },
];

function GastosFamiliares({ data, setData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      gastosFamiliares: {
        ...prevData.gastosFamiliares,
        [name]: parseFloat(value),
      }
    }));
  };

  return (
    <div>
      <h2>Gastos del grupo Familiar</h2>
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
                    value={data.gastosFamiliares[item.name] || ''}
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

export default GastosFamiliares;
