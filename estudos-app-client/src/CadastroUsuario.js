import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocalServerUrl } from './LocalServer';

function CadastroPessoasScreen() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sala, setSala] = useState('');
  const [salas, setSalas] = useState([]);

  // Função para carregar as salas disponíveis
  const carregarSalas = async () => {
    try {
      const response = await axios.get(`http://${LocalServerUrl}/salas`);
      setSalas(response.data);
    } catch (error) {
      console.error('Erro ao carregar salas:', error);
    }
  };

  // Função para carregar as pessoas do servidor
  const carregarPessoas = async () => {
    try {
      const response = await axios.get(`http://${LocalServerUrl}/pessoas`);
      // console.log(LocalServerUrl)
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    }
  };

  // UseEffect para carregar salas assim que o componente for montado
  useEffect(() => {
    carregarSalas();
  }, []);

  // UseEffect para carregar pessoas sempre que houver uma mudança nas pessoas
  useEffect(() => {
    carregarPessoas();
  }, [pessoas]);

  const adicionarPessoa = async () => {
    try {
      await axios.post(`http://${LocalServerUrl}/pessoas`, { nome, idade, sala });
      // Agora, as pessoas serão recarregadas automaticamente devido ao UseEffect
      setNome('');
      setIdade('');
      setSala('');
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Pessoas</h2>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label>
        Idade:
        <input type="text" value={idade} onChange={(e) => setIdade(e.target.value)} />
      </label>
      <label>
        Sala:
        <select value={sala} onChange={(e) => setSala(e.target.value)}>
          <option value="">Selecione uma sala</option>
          {salas.map((sala) => (
            <option key={sala.id} value={sala.id}>
              {sala.nomeSala}
            </option>
          ))}
        </select>
      </label>
      <button onClick={adicionarPessoa}>Adicionar Pessoa</button>

      <h3>Pessoas Cadastradas</h3>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome}, {pessoa.idade} anos, Sala: {pessoa.sala}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastroPessoasScreen;
