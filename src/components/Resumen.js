import React, { useState, useEffect } from 'react';
import GenerarPDF from './GenerarPDF';
import EnviarEmail from './EnviarEmail';

function Resumen({ data, prevStep }) {
  const [showDetail, setShowDetail] = useState({
    familia: false,
    hijos: false,
    anuales: false,
  });

  const [fechaHora, setFechaHora] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES');
    const formattedTime = now.toLocaleTimeString('es-ES');
    setFechaHora(`${formattedDate} ${formattedTime}`);
  }, []);

  const toggleDetail = (section) => {
    setShowDetail((prevDetail) => ({
      ...prevDetail,
      [section]: !prevDetail[section],
    }));
  };

  const calcularTotal = (gastos) => {
    return Object.values(gastos).reduce((total, valor) => total + (valor || 0), 0);
  };

  const totalFamiliares = calcularTotal(data.gastosFamiliares);
  const totalHijos = calcularTotal(data.gastosHijos);
  const totalAnuales = calcularTotal(data.gastosAnuales);

  const formatNumber = (number) => {
    return number.toLocaleString('es-ES', { minimumFractionDigits: 0 });
  };

  const itemsFamiliares = [
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

  const itemsHijos = [
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

  const itemsAnuales = [
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

  return (
    <div>
      <h2>Resumen</h2>
      <div>
        <strong>Nombre:</strong> {data.nombre}<br />
        <strong>Correo:</strong> {data.correo}<br />
        <strong>Teléfono:</strong> {data.telefono}<br />
        <strong>Fecha y Hora de Generación:</strong> {fechaHora}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Tipo de Gasto</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gastos del grupo Familiar</td>
            <td>${formatNumber(totalFamiliares)}</td>
            <td>
              <button type="button" className="btn btn-link" onClick={() => toggleDetail('familia')}>
                {showDetail.familia ? 'Ocultar detalle' : 'Ver detalle'}
              </button>
            </td>
          </tr>
          {showDetail.familia && (
            <tr>
              <td colSpan="3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Ítem</th>
                      <th>Descripción</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsFamiliares.map((item) => (
                      <tr key={item.name}>
                        <td>{item.label}</td>
                        <td>{item.description}</td>
                        <td>${formatNumber(data.gastosFamiliares[item.name] || 0)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2"><strong>Subtotal</strong></td>
                      <td><strong>${formatNumber(totalFamiliares)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
          <tr>
            <td>Gastos particulares de los hijos</td>
            <td>${formatNumber(totalHijos)}</td>
            <td>
              <button type="button" className="btn btn-link" onClick={() => toggleDetail('hijos')}>
                {showDetail.hijos ? 'Ocultar detalle' : 'Ver detalle'}
              </button>
            </td>
          </tr>
          {showDetail.hijos && (
            <tr>
              <td colSpan="3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Ítem</th>
                      <th>Descripción</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsHijos.map((item) => (
                      <tr key={item.name}>
                        <td>{item.label}</td>
                        <td>{item.description}</td>
                        <td>${formatNumber(data.gastosHijos[item.name] || 0)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2"><strong>Subtotal</strong></td>
                      <td><strong>${formatNumber(totalHijos)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
          <tr>
            <td>Gastos de una vez al año</td>
            <td>${formatNumber(totalAnuales)}</td>
            <td>
              <button type="button" className="btn btn-link" onClick={() => toggleDetail('anuales')}>
                {showDetail.anuales ? 'Ocultar detalle' : 'Ver detalle'}
              </button>
            </td>
          </tr>
          {showDetail.anuales && (
            <tr>
              <td colSpan="3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Ítem</th>
                      <th>Descripción</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsAnuales.map((item) => (
                      <tr key={item.name}>
                        <td>{item.label}</td>
                        <td>{item.description}</td>
                        <td>${formatNumber(data.gastosAnuales[item.name] || 0)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2"><strong>Subtotal</strong></td>
                      <td><strong>${formatNumber(totalAnuales)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Total General: ${formatNumber(totalFamiliares + totalHijos + totalAnuales)}</h3>
      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
        <EnviarEmail data={data} fechaHora={fechaHora} />
        <GenerarPDF data={data} fechaHora={fechaHora} />
      </div>
      <p className="mt-3"><strong>Presupuesto generado a través del Sitio de Rocío Zacconi Abogada.</strong></p>
    </div>
  );
}

export default Resumen;
