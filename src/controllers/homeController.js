const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    if (!res.locals.user) return res.redirect('/login/index')
    
    const contatos = await Contato.buscaContatosPorIdUser(res.locals.user)
    res.render('index', { contatos })
};
