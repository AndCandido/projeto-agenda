import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Contato from './modules/Contato';

//Login
const login = new Login('.form-login')
const cadastro = new Login('.form-cadastro')
login.init()
cadastro.init()

//Contatos
const contato = new Contato('.form-contato')
contato.init()