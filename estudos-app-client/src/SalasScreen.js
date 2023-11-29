import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalasScreen() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lógica para buscar as salas do banco de dados
    const fetchSalas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/salas');
        setSalas(response.data);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []); // O array vazio assegura que o efeito só é executado uma vez, similar ao componentDidMount

  if (loading) {
    return <p>Carregando salas...</p>;
  }

  return (
    <div>
      <h2>Tela de Salas</h2>
      <ul>
        {salas.map((sala) => (
          <li key={sala.id}>{sala.nomeSala}</li>
        ))}
      </ul>
      {/* Restante do código */}
    </div>
  );
}

export default SalasScreen;
