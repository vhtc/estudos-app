import React, { useState } from 'react';
import axios from 'axios';

function CadastroSalasScreen() {
  const [nomeSala, setNomeSala] = useState('');
  const [senha, setSenha] = useState('');


  // const handleCriarSala = async () => {
  //   try {
  //     // Lógica para criar uma nova sala
  //     await axios.post('http://localhost:3001/salas', { nomeSala });

  //     // Chame a função fornecida pelo componente pai para atualizar a lista de salas
  //   //   onCriarSala(nomeSala);

  //     // Limpe o campo após criar uma sala
  //     setNomeSala('');
  //   } catch (error) {
  //     console.error('Erro ao criar sala:', error);
  //   }
  // };
  const handleCriarSala = async () => {
    try {
      // Lógica para criar uma nova sala
      await axios.post('http://localhost:3001/salas', { nomeSala, senha });

      // Chame a função fornecida pelo componente pai para atualizar a lista de salas
      onCriarSala(nomeSala);

      // Limpe os campos após criar uma sala
      setNomeSala('');
      setSenha('');
    } catch (error) {
      console.error('Erro ao criar sala:', error);
    }
  };


  return (
    <div>
      <h2>Cadastro de Salas</h2>
      <label>
        Nome da Sala:
        <input type="text" value={nomeSala} onChange={(e) => setNomeSala(e.target.value)} />
      </label>
      <label>
        Senha:
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>

      <button onClick={handleCriarSala}>Criar Sala</button>
    </div>
  );
}

export default CadastroSalasScreen;
