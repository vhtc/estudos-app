// VisualizarPessoasScreen.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VisualizarPessoasScreen() {
  const [salas, setSalas] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salasResponse = await axios.get('http://localhost:3001/salas');
        const pessoasResponse = await axios.get('http://localhost:3001/pessoas');

        setSalas(salasResponse.data);
        setPessoas(pessoasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar salas ou pessoas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div>
      <h2>Visualizar Pessoas por Sala</h2>
      {salas.map((sala) => (
        <div key={sala.id}>
          <h3>Sala: {sala.nomeSala}</h3>
          <ul>
            {pessoas.map((pessoa) => (
              pessoa.sala && pessoa.sala.trim().toLowerCase() === sala.nomeSala.trim().toLowerCase() && (
                <li key={pessoa.id}>
                  <strong>{pessoa.nome}</strong> - Idade: {pessoa.idade} - Sala: {pessoa.sala}
                </li>
              )
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VisualizarPessoasScreen;
