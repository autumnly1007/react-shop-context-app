import React, { useState } from 'react';
import './App.css';
import OrderPage from './pages/OrderPage';
import CompletePage from './pages/CompletePage';
import SummaryPage from './pages/SummaryPage';

const App = () => {
  const [step, setStep] = useState(0);

  return (
    <div style={{ padding: '4rem' }}>
      {step === 0 ? <OrderPage setStep={setStep} /> : null}
      {step === 1 ? <SummaryPage setStep={setStep} /> : null}
      {step === 2 ? <CompletePage setStep={setStep} /> : null}
    </div>
  );
};

export default App;
