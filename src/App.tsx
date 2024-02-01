// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Menu'; // Asegúrate de importar el nombre correcto del componente
import InfoComponent from './page/Info';
import HabitacionesContainer from './components/habitacionescontainer';
import Contactos from './page/contactos';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Coloca el Navbar en la posición deseada */}
        <Routes>
          <Route path="/" element={<InfoComponent />} />
          <Route path="/habitaciones" element={<HabitacionesContainer />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
