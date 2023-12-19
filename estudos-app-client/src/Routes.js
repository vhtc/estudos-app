// Importe as bibliotecas necessárias
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importe os componentes que você criou
import LoginScreen from './LoginScreen';
import SalasScreen from './SalasScreen';
import CadastroUsuario from './CadastroUsuario';
import AppSalas from './AppSalas';
import CadastroSalasScreen from './CadastroSalaScreen';
import VisualizarPessoasScreen from './VisualizarPessoasScreen';


// Componente principal que configura as rotas
const Routes1 = () => {
    return (
        <Router>
            <Routes>
                {/* Rota para a tela de login */}
                <Route exact path={"/login"} element={<LoginScreen />}>
                </Route>

                {/* Rota para a tela de salas */}
                <Route exact path={"/salas"} element={<SalasScreen />} />

                {/* Rota para a tela de cadastro de pessoas */}
                <Route exact path={"/cadastro-usuario"} element={<CadastroUsuario />} />

                {/* Rota padrão, redireciona para a tela de login */}
                <Route exact path={"/appsalas"} element={<AppSalas />} />

                {/* Rota padrão, redireciona para a tela cadastro de salas */}
                <Route exact path={"/cadastro-salas"} element={<CadastroSalasScreen />} />

                {/* Rota padrão, redireciona para a tela cadastro de salas */}
                <Route exact path={"/visualizar-salas-pessoas"} element={<VisualizarPessoasScreen />} />

            </Routes>


        </Router >
    );
}
export default Routes1;
