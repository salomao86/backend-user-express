const { body, validationResult } = require('express-validator');

const DATE_REGEX = "[0-9]{2}[/][0-9]{2}[/][0-9]{4}$";
const CPF_REGEX = "[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}";

exports.validationBodyRules = [
    body('nome', 'nome é obrigatório').notEmpty(),
    body('dataNascimento', 'dataNascimento deve ter o formato DD/MM/YYYY').matches(DATE_REGEX),
    body('genero', 'genero preenchido não é válido').isIn(['Masculino', 'Femenino', 'Outro']),
    body('cpf', 'cpf deve ter o formato NNN.NNN.NNN-NN').matches(CPF_REGEX),
    body('endereco.logradouro', 'logradouro do endereço é obrigatório').notEmpty(),
    body('endereco.numero', 'número do endereço é obrigatório').notEmpty(),
    body('endereco.cidade', 'cidade do endereço é obrigatório').notEmpty(),
    body('endereco.cep', 'cep do endereço é obrigatório').notEmpty(),
    body('endereco.bairro', 'bairro do endereço é obrigatório').notEmpty(),
    body('endereco.pais', 'pais do endereço é obrigatório').notEmpty(),
    body('email', 'email é obrigatório').isEmail(),
    body('senha', 'senha deve ser complexa por questões de segurança').isStrongPassword()
];

exports.checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};