import React from 'react';
import emailjs from 'emailjs-com';

const EnviarEmail = ({ data, fechaHora }) => {
  const formatNumber = (number) => {
    return number.toLocaleString('es-ES', { minimumFractionDigits: 0 });
  };

  const calcularTotal = (gastos) => {
    return Object.values(gastos).reduce((total, valor) => total + (valor || 0), 0);
  };

  const itemsFamiliares = [
    { name: 'alimentacion', label: 'Alimentación', description: 'Compras de alimentos, colaciones, de manera periódica y específica (ej: pan diario)' },
    { name: 'supermercado', label: 'Supermercado', description: 'Compras de la canasta básica del hogar.' },
    { name: 'feria', label: 'Feria', description: 'Compra de frutas y verduras' },
    { name: 'arriendo', label: 'Arriendo y/o dividendo', description: 'Pago de arriendo o dividendo de la vivienda' },
    { name: 'gastosComunes', label: 'Gastos comunes', description: 'Pago asociado a gastos comunes derivados de la vivienda' },
    { name: 'agua', label: 'Agua', description: 'Gastos básicos de pago de agua' },
    { name: 'luz', label: 'Luz', description: 'Gastos básicos de pago de luz' },
    { name: 'gas', label: 'Gas', description: 'Gastos básicos de pago de gas' },
    { name: 'internet', label: 'Internet', description: 'Pago asociado a la cuenta de internet del hogar.' },
    { name: 'tvCable', label: 'TV cable', description: 'Pago de servicio de tv por cable' },
    { name: 'telefono', label: 'Teléfono', description: 'Pago asociado a las cuentas teléfono familiar' },
    { name: 'colaboracionDomestica', label: 'Colaboración doméstica', description: 'Pago a servicio o persona que ayuda con las tareas domésticas' },
    { name: 'entretenimientoInterior', label: 'Entretenimiento interior del hogar', description: 'Gastos de streaming y plataformas de entretenimiento y/o juegos' },
    { name: 'entretenimientoExterior', label: 'Entretenimiento exterior', description: 'Salidas, cine, hobbies' },
    { name: 'transporte', label: 'Transporte', description: 'Combustible, transporte público, mantenimiento del vehículo familiar' },
    { name: 'tagAutopistas', label: 'Pago TAG autopistas', description: 'Pago de peajes de autopista' },
  ];

  const itemsHijos = [
    { name: 'vestuario', label: 'Vestuario y artículos personales', description: 'Compra de ropa, vestuario, calzado.' },
    { name: 'matricula', label: 'Matrícula', description: 'Gastos de matrícula' },
    { name: 'colegiatura', label: 'Colegiatura', description: 'Pago de colegiatura mensual' },
    { name: 'otrosGastosEscolares', label: 'Otros Gastos escolares', description: 'Pago de cuotas y actividades academias varias' },
    { name: 'tallerAcademia', label: 'Taller o academia', description: 'Gastos asociados a actividades tales como fútbol, ballet, piano u otras actividades relacionadas que tengan un pago requerido' },
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

  const generateEmailContent = () => {
    const gastosFamiliares = Object.keys(data.gastosFamiliares).map((key) => {
      const item = itemsFamiliares.find(item => item.name === key) || {};
      return `<tr><td>${item.label || key}</td><td>${item.description || ''}</td><td>$${formatNumber(data.gastosFamiliares[key] || 0)}</td></tr>`;
    }).join('');

    const gastosHijos = Object.keys(data.gastosHijos).map((key) => {
      const item = itemsHijos.find(item => item.name === key) || {};
      return `<tr><td>${item.label || key}</td><td>${item.description || ''}</td><td>$${formatNumber(data.gastosHijos[key] || 0)}</td></tr>`;
    }).join('');

    const gastosAnuales = Object.keys(data.gastosAnuales).map((key) => {
      const item = itemsAnuales.find(item => item.name === key) || {};
      return `<tr><td>${item.label || key}</td><td>${item.description || ''}</td><td>$${formatNumber(data.gastosAnuales[key] || 0)}</td></tr>`;
    }).join('');

    return `
      <h2>Resumen de Pensión de Alimentos</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Correo:</strong> ${data.correo}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Fecha y Hora de Generación:</strong> ${fechaHora}</p>
      
      <h3>Gastos del grupo Familiar</h3>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Ítem</th>
            <th>Descripción</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          ${gastosFamiliares}
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>$${formatNumber(calcularTotal(data.gastosFamiliares))}</strong></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Gastos particulares de los hijos</h3>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Ítem</th>
            <th>Descripción</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          ${gastosHijos}
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>$${formatNumber(calcularTotal(data.gastosHijos))}</strong></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Gastos de una vez al año</h3>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Ítem</th>
            <th>Descripción</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          ${gastosAnuales}
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>$${formatNumber(calcularTotal(data.gastosAnuales))}</strong></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Resumen de Totales</h3>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Tipo de Gasto</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gastos del grupo Familiar</td>
            <td>$${formatNumber(calcularTotal(data.gastosFamiliares))}</td>
          </tr>
          <tr>
            <td>Gastos particulares de los hijos</td>
            <td>$${formatNumber(calcularTotal(data.gastosHijos))}</td>
          </tr>
          <tr>
            <td>Gastos de una vez al año</td>
            <td>$${formatNumber(calcularTotal(data.gastosAnuales))}</td>
          </tr>
          <tr>
            <td><strong>Total General</strong></td>
            <td><strong>$${formatNumber(calcularTotal(data.gastosFamiliares) + calcularTotal(data.gastosHijos) + calcularTotal(data.gastosAnuales))}</strong></td>
          </tr>
        </tbody>
      </table>
    `;
  };

  const sendEmail = () => {
    const emailContent = generateEmailContent();

    const emailParams = {
      to_name: data.nombre,
      to_email: data.correo,
      message_html: emailContent
    };

    emailjs.send('service_ssbr6rf', 'template_jzwg6qa', emailParams, 'qpGtsL6e6SJilmpqC')
      .then((response) => {
        console.log('Correo enviado exitosamente!', response.status, response.text);
      }, (err) => {
        console.error('Error al enviar el correo:', err);
      });
  };

  return (
    <button type="button" className="btn btn-primary" onClick={sendEmail}>Enviar por Correo</button>
  );
};

export default EnviarEmail;
