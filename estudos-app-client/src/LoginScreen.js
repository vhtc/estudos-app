import React, { useState } from 'react';
import axios from 'axios';
import { LocalServerUrl } from './LocalServer';
import { Link } from 'react-router-dom';

function LoginScreen() {
  const [nomeSala, setNomeSala] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${LocalServerUrl}/salas/login`, { nomeSala, senha });
      console.log(response.data);


      alert(`Login bem-sucedido! ID da Sala: ${response.data.nomeSala}`);
    } catch (error) {
      alert(`Erro ao fazer login`);
    }
  };

  return (
    <div>
      <h2>Tela de Login</h2>
      <label>
        Nickname:
        <input type="text" value={nomeSala} onChange={(e) => setNomeSala(e.target.value)} />
      </label>
      <label>
        Senha:
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
      <Link to='/cadastro-usuario' >
        <button>Cadastrar Usuário</button>
      </Link>
    </div>
  );
}

export default LoginScreen;
