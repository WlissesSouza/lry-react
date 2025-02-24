import React from 'react';
import PageWrapper from './components/PageWrapper'; 
import FiltrosPage from './pages/FiltrosPage';



function App() {
  return (
    <PageWrapper title="Gerenciamento de consultas">
    <FiltrosPage />
  </PageWrapper>
  );
}

export default App;
