import validator from "validator"

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target
        const nomeInput = el.querySelector('input[name=nome]')
        const sobrenomeInput = el.querySelector('input[name=sobrenome]')
        const emailInput = el.querySelector('input[name=email]')
        const telefoneInput = el.querySelector('input[name=telefone]')

        let error = false
        
        if(emailInput.value && !validator.isEmail(emailInput.value)){
            error = true
            alert('Email inválido')
        }
        if(!nomeInput.value) {
            error = true
            alert('O campo nome está vazio')
        }
        if(!sobrenomeInput.value) {
            error = true
            alert('O campo sobrenome está vazio')
        }
        if(nomeInput.value.length > 40) {
            error = true
            alert('O máximo de caracteres permitidos no campo nome são 40')
        }
        if(sobrenomeInput.value.length > 100) {
            error = true
            alert('O máximo de caracteres permitidos no campo sobrenome são 100')
        }
        if(!emailInput.value && !telefoneInput.value) {
            error = true
            alert('O campo email ou contato deve ser preenchido')
        }

        if(!error) el.submit()
    }
}