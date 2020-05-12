"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");

class UserController {
  async create({ request, response }) {
    try {
      const errorMessage = {
        "username.required": "this field is required",
        "username.unique": "this user already exists",
        "username.min": "the username need a minimun of 5 characters",
        "email.required": "this field is required",
        "email.unique": "this email already exists",
        "password.min": "the password need a minimun of 6 characters",
      };

      const validation = await validateAll(
        request.all(),
        {
          username: "required|min:5|unique:users",
          email: "require|email|unique:users",
          password: "required|min:6",
        },
        errorMessage
      );

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }

      const data = request.only(["username", "email", "password"]);

      const user = await User.create(data);

      return user;
    } catch (err) {
      return response.status(500).send({ error: `Erro: ${err.message}` });
    }
  }

  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      const validateToken = await auth.attempt(email, password);

      return validateToken;
    } catch (err) {
      return response.status(500).send({ error: `Error: ${err.message}` });
    }
  }
}

module.exports = UserController;
