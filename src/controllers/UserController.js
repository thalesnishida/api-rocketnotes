const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqlConnection = require("../database/sqlite");

const UserReposirory = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userReposirory = new UserReposirory();
    const userCreateService = new UserCreateService(userReposirory);
    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqlConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    if (!user) {
      throw new AppError("User not found!");
    }

    const userWithEmailUpdate = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithEmailUpdate && userWithEmailUpdate.id != user.id) {
      throw new AppError("This email already exists!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Precisa informa a senha antiga para definir nova senha!"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      update_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.json();
  }
}

module.exports = UserController;
