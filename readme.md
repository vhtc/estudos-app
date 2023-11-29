# Iniciando projeto de sqlite3 com node, react


## Criar uma pasta central
criei a pasta chamada projetosqlite3
dentro dela criei a estudos-app que é o servidor
e outra estudos-app-client que é o react

## estudos-app (servidor)
npm init -y
<!-- npm install sqlite3 express -y  forma invalida -->
npm install express@latest
npm install sqlite3@latest
npm install cors

## estudos-app-client
npx creat-react-app estudos-app-client
cd estudos-app-client
npm install axios
npm install react-router-dom

### Execução do projeto
dentro da pasta estudos-app, no terminal digite 'node server.js'
dentro da pasta estudos-app-client, no terminal digite 'npm start'