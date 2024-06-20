import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import StepForm from './components/StepForm';
import NavBar from './components/NavBar';
import GenerarPDF from './components/GenerarPDF';
import EnviarEmail from './components/EnviarEmail';
import EnviarWhatsApp from './components/EnviarWhatsApp';

function App() {
  const [data, setData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    integrantesFamilia: 0,
    numeroHijos: 0,
    gastosFamiliares: {},
    gastosHijos: {},
    gastosAnuales: {},
  });

  const [pdfData, setPdfData] = useState(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const fechaHora = new Date().toLocaleString('es-ES');

  const handlePDFGenerated = (data) => {
    setPdfData(data);
  };

  const handleFormCompletion = () => {
    setFormCompleted(true);
  };

  return (
    <div className="background">
      <NavBar />
      <div className="container mt-5">
        <h1 className="text-center text-gray">Calculadora de Pensión de Alimentos</h1>
        <StepForm data={data} setData={setData} onComplete={handleFormCompletion} />
        {formCompleted && (
          <div className="d-flex justify-content-center mt-4">
            <GenerarPDF data={data} fechaHora={fechaHora} onPDFGenerated={handlePDFGenerated} />
            {pdfData && <EnviarEmail pdfData={pdfData} />}
            {pdfData && <EnviarWhatsApp pdfData={pdfData} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
