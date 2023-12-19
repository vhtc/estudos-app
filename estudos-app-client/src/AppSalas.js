import React, { useState, useEffect } from 'react';
import SalasScreen from './SalasScreen';
import CadastroPessoasScreen from './CadastroUsuario';
import LoginScreen from './LoginScreen';



// Exemplo do App principal
function AppSalas() {
    const [user, setUser] = useState(null);
    const [salas, setSalas] = useState([]);
  
    const handleLogin = (username) => {
      // Lógica de autenticação (pode ser uma chamada a uma API, etc.)
      setUser(username);
    };
  
    const handleCriarSala = (nomeSala) => {
      // Lógica para criar uma sala (pode ser uma chamada a uma API, etc.)
      // Atualiza a lista de salas
      setSalas((prevSalas) => [...prevSalas, { id: prevSalas.length + 1, nomeSala }]);
    };
  
    return (
      <div>
        {user ? (
          <>
            <SalasScreen salas={salas} onCriarSala={handleCriarSala} />
            <CadastroPessoasScreen salas={salas} />
          </>
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </div>
    );
  }
  
  export default AppSalas;
  