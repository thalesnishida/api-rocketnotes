const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization;
  
  if(!authHeader){
    throw new AppError("Token nao encontrado");
  }

  const [, token ] = authHeader.split(" ");

  try {
    const { sub: user_id} = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id)
    }

    next();
  } catch {
    throw new AppError("Token invalido")
  }

}

module.exports = ensureAuthenticated;