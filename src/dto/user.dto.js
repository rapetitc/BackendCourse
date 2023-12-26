import ErrorHandler from "../utils/errorsHandler.js";

export default class UserDTO {
  constructor(user, to) {
    to ? this.#options[to](user) : ErrorHandler.create({ message: "No DTO Selected", code: 0 });
  }
  #options = {
    response: ({ first_name, last_name, age, email, role, cart, profile_picture, last_connection }) => {
      this.first_name = first_name;
      this.last_name = last_name;
      this.age = age;
      this.email = email;
      this.role = role;
      this.cart = cart;
      this.profile_picture = profile_picture;
      this.last_connection = last_connection;
    },
  };
}
