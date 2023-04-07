const mongoose = require('mongoose');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: ''},
    dataDeCriacao: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }

    static async buscaPorId(id) {
        if(typeof id !== 'string') return
        const contato = await ContatoModel.findById(id)
        return contato
    }

    static async buscaContatos() {
        const contatos = await ContatoModel.find()
            .sort({ dataDeCriacao: -1 })
        return contatos
    }

    static async delete(id) {
        if(typeof id !== 'string') return
        const contato = await ContatoModel.findOneAndDelete({ _id: id })
        return contato
    }
    
    async register() {
        this.valida()
        if(this.errors.length > 0) return
        
        this.contato = await ContatoModel.create(this.body)
    }

    valida() {
        this.cleanUp()

        if(this.body.email && !validator.isEmail(this.body.email))
            this.errors.push('Email inválido')
        if(!this.body.nome)
            this.errors.push('O campo nome está vazio')
        if(this.body.nome.length > 50)
            this.errors.push('O máximo de caracteres permitidos no campo nome é 50')
        if(!this.body.email && !this.body.telefone)
            this.errors.push('O campo email ou contato deve ser preenchido')
    }

    cleanUp() {
        for (let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    }
    
    async edit(id) {
        if(typeof id !== 'string') return
        this.valida()
        if(this.errors.length > 0) return
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
    }
}

module.exports = Contato;
