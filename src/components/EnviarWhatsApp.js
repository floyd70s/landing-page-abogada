import React from 'react';

const EnviarWhatsApp = ({ pdfData }) => {
  const sendWhatsApp = () => {
    const encodedPdfData = encodeURIComponent(pdfData);
    const whatsappMessage = `Aquí tienes el PDF con el resumen de la pensión de alimentos. ${encodedPdfData}`;
    const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button type="button" className="btn btn-success" onClick={sendWhatsApp}>
      Enviar al WhatsApp
    </button>
  );
};

export default EnviarWhatsApp;
