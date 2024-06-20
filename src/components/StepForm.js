import React, { useState } from 'react';
import DatosGenerales from './DatosGenerales';
import GastosFamiliares from './GastosFamiliares';
import GastosHijos from './GastosHijos';
import GastosAnuales from './GastosAnuales';
import Resumen from './Resumen';
import InformacionPersonal from './InformacionPersonal';

const StepForm = ({ data, setData }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const stepTitles = ["Información Personal", "Datos Generales", "Gastos Familiares", "Gastos Hijos", "Gastos Anuales", "Resumen"];
  
  return (
    <div className="form-content">
      <div className="step-indicator">
        {stepTitles.map((title, index) => (
          <React.Fragment key={index}>
            <div className={`step ${index + 1 === step ? 'active' : ''}`}>
              {index + 1}
            </div>
            {index < stepTitles.length - 1 && <div className="step-line"></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="step-form">
        {step === 1 && <InformacionPersonal data={data} setData={setData} nextStep={nextStep} />}
        {step === 2 && <DatosGenerales data={data} setData={setData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <GastosFamiliares data={data} setData={setData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <GastosHijos data={data} setData={setData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 5 && <GastosAnuales data={data} setData={setData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 6 && <Resumen data={data} prevStep={prevStep} />}
      </div>
    </div>
  );
};

export default StepForm;
