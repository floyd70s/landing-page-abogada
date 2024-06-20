import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import timbreImage from '../images/timbreFormal.png'; // Asegúrate de que la ruta es correcta

const GenerarPDF = ({ data, fechaHora, onPDFGenerated }) => {
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

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Generado en el sitio de Rocío Zacconi Abogada', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    
    // Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('Cálculo de pensión de alimentos', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    // User Info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Nombre: ${data.nombre}`, 14, 30);
    doc.text(`Correo: ${data.correo}`, 14, 36);
    doc.text(`Teléfono: ${data.telefono}`, 14, 42);

    // Family Expenses
    let y = 50;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Gastos del grupo Familiar', 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.autoTable({
      startY: y,
      head: [['Ítem', 'Descripción', 'Monto']],
      body: Object.keys(data.gastosFamiliares).map((key) => [
        itemsFamiliares.find(item => item.name === key)?.label || key,
        itemsFamiliares.find(item => item.name === key)?.description || '',
        `$${formatNumber(data.gastosFamiliares[key] || 0)}`
      ]),
      styles: { fillColor: [220, 220, 220] },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      margin: { left: 14, right: 14 }
    });
    y = doc.previousAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${formatNumber(calcularTotal(data.gastosFamiliares))}`, doc.internal.pageSize.getWidth() - 14, y, { align: 'right' });

    // Children's Expenses
    y += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Gastos particulares de los hijos', 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.autoTable({
      startY: y,
      head: [['Ítem', 'Descripción', 'Monto']],
      body: Object.keys(data.gastosHijos).map((key) => [
        itemsHijos.find(item => item.name === key)?.label || key,
        itemsHijos.find(item => item.name === key)?.description || '',
        `$${formatNumber(data.gastosHijos[key] || 0)}`
      ]),
      styles: { fillColor: [220, 220, 220] },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      margin: { left: 14, right: 14 }
    });
    y = doc.previousAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${formatNumber(calcularTotal(data.gastosHijos))}`, doc.internal.pageSize.getWidth() - 14, y, { align: 'right' });

    // Add a new page for annual expenses if necessary
    if (y + 60 > doc.internal.pageSize.getHeight()) {
      doc.addPage();
      y = 20;
    } else {
      y += 20;
    }

    // Annual Expenses
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Gastos de una vez al año', 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.autoTable({
      startY: y,
      head: [['Ítem', 'Descripción', 'Monto']],
      body: Object.keys(data.gastosAnuales).map((key) => [
        itemsAnuales.find(item => item.name === key)?.label || key,
        itemsAnuales.find(item => item.name === key)?.description || '',
        `$${formatNumber(data.gastosAnuales[key] || 0)}`
      ]),
      styles: { fillColor: [220, 220, 220] },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      margin: { left: 14, right: 14 }
    });
    y = doc.previousAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${formatNumber(calcularTotal(data.gastosAnuales))}`, doc.internal.pageSize.getWidth() - 14, y, { align: 'right' });

    // Summary Table
    y += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen de Totales', 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.autoTable({
      startY: y,
      head: [['Tipo de Gasto', 'Monto']],
      body: [
        ['Gastos del grupo Familiar', `$${formatNumber(calcularTotal(data.gastosFamiliares))}`],
        ['Gastos particulares de los hijos', `$${formatNumber(calcularTotal(data.gastosHijos))}`],
        ['Gastos de una vez al año', `$${formatNumber(calcularTotal(data.gastosAnuales))}`]
      ],
      styles: { fillColor: [220, 220, 220] },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      margin: { left: 14, right: 14 },
      columnStyles: {
        1: { halign: 'right' } // Align totals to the right
      }
    });

    // General Total
    y = doc.previousAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total General: $${formatNumber(calcularTotal(data.gastosFamiliares) + calcularTotal(data.gastosHijos) + calcularTotal(data.gastosAnuales))}`, doc.internal.pageSize.getWidth() - 14, y, { align: 'right' });

    // Watermark
    const imgWidth = 50; // Adjust the width according to your image
    const imgHeight = 50; // Adjust the height according to your image
    const margin = 14;
    const posX = doc.internal.pageSize.getWidth() - imgWidth - margin;
    const posY = doc.internal.pageSize.getHeight() - imgHeight - margin;
    doc.addImage(timbreImage, 'PNG', posX, posY, imgWidth, imgHeight);

    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150);
    doc.text(`Fecha y Hora de Generación: ${fechaHora}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });

    if (onPDFGenerated) {
      const pdfData = doc.output('datauristring');
      onPDFGenerated(pdfData);
    }

    return doc;
  };

  const downloadPDF = () => {
    const doc = generatePDF();
    doc.save('resumen_pension_alimentos.pdf');
  };

  return (
    <button type="button" className="btn btn-primary" onClick={downloadPDF}>Exportar a PDF</button>
  );
};

export default GenerarPDF;
