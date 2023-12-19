import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Routes1 from './Routes';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sala, setSala] = useState('');

  useEffect(() => {
    // Ao carregar o componente, busca a lista de pessoas no servidor
    axios.get('http://localhost:3001/pessoas')
      .then(response => {
        setPessoas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar pessoas:', error);
      });
  }, []);

  const adicionarPessoa = () => {
    // Envia uma solicitação para adicionar uma pessoa ao servidor
    axios.post('http://localhost:3001/pessoas', { nome, idade, sala })
      .then(response => {
        setPessoas(response.data);
        setNome('');
        setIdade('');
        setSala('');
      })
      .catch(error => {
        console.error('Erro ao adicionar pessoa:', error);
      });
  };

  return (
    <div>
      <h1>Estudos App</h1>
      {/* <div>
        <label>Nome: </label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
      </div>
      <div>
        <label>Idade: </label>
        <input type="text" value={idade} onChange={e => setIdade(e.target.value)} />
      </div>
      <div>
        <label>Sala: </label>
        <input type="text" value={sala} onChange={e => setSala(e.target.value)} />
      </div>
      <button onClick={adicionarPessoa}>Adicionar Pessoa</button>

      <h2>Pessoas:</h2>
      <ul>
        {pessoas.map(pessoa => (
          pessoa.sala === 'vhtc' && (
            <li key={pessoa.id}>{pessoa.nome}, {pessoa.sala ? pessoa.sala : 'Sem sala'}, {pessoa.idade} anos</li>
          )
        ))}
      </ul> */}
      <ul>

      </ul>

      <Routes1 />
    </div>
  );
}

export default App;
