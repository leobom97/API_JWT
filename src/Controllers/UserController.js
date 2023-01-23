const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");

class UserController {
  index(req, res) {
    console.log(req.body);
  }

  show(req, res) {
    var users = ["Leo", "Lucas", "Brenno", "Larissa", "Fernanda"];
    return res.status(200).json({
      error: false,
      users,
    });
  }

  async store(req, res) {
    /*
      Validação através do yup schema
      *Início
    */
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        mensagem: "Dados Inválidos",
      });
    }

    /*
      Validação através do yup schema
      *Fim
    */

    /**
     * Verificar se usuário já Existe
     */

    let userAlreadyExisted = await User.findOne({ email: req.body.email });

    if (userAlreadyExisted) {
      return res.status(500).json({
        error: true,
        mensagem: "Esse usuário(a) já está cadastrado",
      });
    }

    /**
     * Desestruturação dos dados da requisição
     *
     *
     */

    const { name, email, password } = req.body;

    /**
     *
     * criação da constante dados
     *
     */

    const dados = {
      name,
      email,
      password,
    };

    /**
     * criptografar senha
     *
     */

    dados.password = await bcrypt.hash(dados.password, 8);

    /**
     * Inserção no banco de dados
     *
     */

    await User.create(dados, (error) => {
      if (error) {
        return res.status(400).json({
          error: true,
          mensagem: "Erro ao tentar cadastrar usuário(a)",
        });
      } else {
        return res.status(200).json({
          error: false,
          mensagem: "Usuário(a) cadastrados com Sucesso!!!",
        });
      }
    });
  }
}

module.exports = new UserController();
