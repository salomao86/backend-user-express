const users = [
    {
        nome: "Olga Pimenta Xavier",
        dataNascimento: "25/12/1960",
        cpf: "08656534378",
        genero: "Femenino",
        endereco: {
            logradouro: "Rua Seis A",
            numero: "1",
            cidade: "São Luís",
            uf: "MA",
            cep: "65055-341",
            bairro: "Jardim São Cristóvão II",
            pais: "Brasil"
        },
        email: "olga.xavier@mail.com",
        senha: "%1yYRmJ@z(J7"
    },
    {
        nome: "Agenor Rodrigues Rosa",
        dataNascimento: "Agenor Rodrigues Rosa",
        genero: "Masculino",
        cpf: "89752253806",
        endereco: {
            logradouro: "Rua I",
            numero: "1",
            cidade: "Vila Velha",
            uf: "ES",
            cep: "29113-032",
            bairro: "Vale Encantado",
            pais: "Brasil"
        },
        email: "agenor.rosa@mail.com",
        senha: "1l0QHoKwlS"
    },
    {
        nome: "Jovenil Pessoa Bento",
        dataNascimento: "14/05/2016",
        genero: "Masculino",
        cpf: "72662964634",
        endereco: {
            logradouro: "Rua Joaquim Carneiro",
            numero: "1",
            cidade: "Magé",
            uf: "RJ",
            cep: "25902-073",
            bairro: "Nova Marília",
            pais: "Brasil"
        },
        email: "jovenil.bento@mail.com.br",
        senha: "ut7&al9lpTfs"
    }
]

const find = (req, res) => {
    const cpf = req.params.id.replace(/\D/g,'');
    let found = false;
    users.map(function(valor) {
        if (valor.cpf == cpf) {
            found = true;
            return res.send(valor);
        }
    });

    if (!found) {
        res.status(404).send({message: `Não foi encontrado usuário com cpf ${cpf}`});
    }
    
}

const findAllUsers = (req, res) => {
    res.send(users);
}

const createUser = (req, res) => {
    const user = req.body;
    user.cpf = user.cpf.replace(/\D/g,'');
    users.push(user);
    return res.status(201).json({ message: 'Usuário criado com sucesso', user });
}

const updateUser = (req, res) => {
    const cpf = req.params.id.replace(/\D/g,'');
    const user = req.body;
    user.cpf = user.cpf.replace(/\D/g,'');
    let found = false;

    users.map(function(valor, index) {
        if (valor.cpf == cpf) {
            found = true;
            users[index] = user;
            return res.status(201).json({ message: 'Usuário atualizado com sucesso', user });
        }
    });

    if (!found) {
        res.status(404).send({message: `Não foi encontrado usuário com cpf ${cpf}`});
    }
    
}

const deleteUser = (req, res) => {
    const cpf = req.params.id.replace(/\D/g,'');
    let found = false;
    users.map(function(valor, index) {
        if (valor.cpf == cpf) {
            found = true;
            users.splice(index, 1);
            return res.send(valor);
        }
    });

    if (!found) {
        res.status(404).send({message: `Não foi encontrado usuário com cpf ${cpf}`});
    }
}

module.exports = {
    find,
    findAllUsers,
    createUser,
    updateUser,
    deleteUser
}