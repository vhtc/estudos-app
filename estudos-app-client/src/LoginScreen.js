import React, { useState } from 'react';
import axios from 'axios';

function LoginScreen() {
  const [nomeSala, setNomeSala] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/salas/login', { nomeSala, senha });
      alert(`Login bem-sucedido! ID da Sala: ${response.data.id}`);
    } catch (error) {
      alert(`Erro ao fazer login: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Nome da Sala:
        <input type="text" value={nomeSala} onChange={(e) => setNomeSala(e.target.value)} />
      </label>
      <label>
        Senha:
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginScreen;
