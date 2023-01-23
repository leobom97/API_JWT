const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const { promissify } = require("util");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: true,
      code: 130,
      msg: "Esse token de autenticação não existe",
    });
  }

  const [token] = auth.split(" ");

  try {
    const decoded = await promissify(jwt.verify)(token, config.secret);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({
        error: true,
        code: 130,
        msg: "Token expirado",
      });
    } else {
      req.user_id = decoded.id;
      next();
    }
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      msg: "token inválido",
    });
  }
};
