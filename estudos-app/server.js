const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

// Essa configuração permitirá que o servidor aceite solicitações de qualquer origem. Em um ambiente de produção, você pode 
// configurar o middleware cors para aceitar apenas origens específicas para melhorar a segurança.
app.use(cors());

// Middleware para interpretar o corpo da solicitação como JSON
app.use(express.json()); 

// Cria uma conexão com o banco de dados SQLite
const db = new sqlite3.Database('estudos.db');

// Cria uma tabela para armazenar nomes, idades e salas
db.run('CREATE TABLE IF NOT EXISTS pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, idade INTEGER, sala INTEGER, UNIQUE (nome, sala), FOREIGN KEY(sala) REFERENCES salas(id))');

// Cria uma tabela para armazenar as salas se não existir
// db.run('CREATE TABLE IF NOT EXISTS salas (id INTEGER PRIMARY KEY AUTOINCREMENT, nomeSala TEXT)');
db.run('CREATE TABLE IF NOT EXISTS salas (id INTEGER PRIMARY KEY AUTOINCREMENT, nomeSala TEXT UNIQUE, senha TEXT)');


// Rota para obter todas as pessoas do banco de dados com informações da sala
app.get('/pessoas', (req, res) => {
  db.all('SELECT pessoas.*, salas.nomeSala AS sala FROM pessoas LEFT JOIN salas ON pessoas.sala = salas.id', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para adicionar uma pessoa ao banco de dados com associação a uma sala
app.post('/pessoas', (req, res) => {
  const { nome, idade, sala } = req.body;
  console.log('Nome:', nome);
  console.log('Idade:', idade);
  console.log('Sala:', sala);

  if (!nome || !idade || !sala) {
    return res.status(400).json({ error: 'Nome, idade e sala são obrigatórios.' });
  }

  // Verifica se a sala existe
  db.get('SELECT * FROM salas WHERE id = ?', [sala], (err, salaRow) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!salaRow) {
      return res.status(404).json({ error: 'Sala não encontrada.' });
    }

    // Adiciona a pessoa associada à sala ao banco de dados
    db.run('INSERT INTO pessoas (nome, idade, sala) VALUES (?, ?, ?)', [nome, idade, sala], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Retorna todas as pessoas após a adição bem-sucedida
      db.all('SELECT pessoas.*, salas.nomeSala AS sala FROM pessoas LEFT JOIN salas ON pessoas.sala = salas.id', (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(rows);
      });
    });
  });
  console.log('Pessoa adicionada com sucesso!');
});

// Adicione uma rota para criar uma sala
// app.post('/salas', (req, res) => {
//   const { nomeSala } = req.body;

//   if (!nomeSala) {
//     return res.status(400).json({ error: 'O nome da sala é obrigatório.' });
//   }

//   db.run('INSERT INTO salas (nomeSala) VALUES (?)', [nomeSala], function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     res.json({ id: this.lastID, nomeSala });
//   });
// });

app.post('/salas', (req, res) => {
  const { nomeSala, senha } = req.body;

  if (!nomeSala || !senha) {
    return res.status(400).json({ error: 'O nome da sala e a senha são obrigatórios.' });
  }

  db.run('INSERT INTO salas (nomeSala, senha) VALUES (?, ?)', [nomeSala, senha], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id: this.lastID, nomeSala });
  });

  
});


// Rota para obter todas as salas
// app.get('/salas', (req, res) => {
//   db.all('SELECT * FROM salas', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

app.get('/salas', (req, res) => {
  db.all('SELECT id, nomeSala FROM salas', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });

});

// Rota para fazer login em uma sala
app.post('/salas/login', (req, res) => {
  const { nomeSala, senha } = req.body;

  if (!nomeSala || !senha) {
    return res.status(400).json({ error: 'Nome da sala e senha são obrigatórios.' });
  }

  db.get('SELECT * FROM salas WHERE nomeSala = ? AND senha = ?', [nomeSala, senha], (err, salaRow) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!salaRow) {
      return res.status(401).json({ error: 'Sala não encontrada ou senha incorreta.' });
    }

    res.json({ id: salaRow.id, nomeSala: salaRow.nomeSala });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
