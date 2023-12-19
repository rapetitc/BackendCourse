import ErrorHandler from "../../utils/ErrorsHandler.js";

// const schema = {
//   first_name: (value) => {
//     if (typeof value !== "string") ErrorHandler.create({ message: "Invalid Data Type", code: 1, cause: "first_name" });
//     if (value.length < 3) ErrorHandler.create({ message: "Lower Than 3 Characters", code: 1, cause: "first_name" });
//     return value;
//   },
//   last_name: (value) => {
//     if (typeof value !== "string") ErrorHandler.create({ message: "Invalid Data Type", code: 1, cause: "last_name" });
//     if (value.length < 3) ErrorHandler.create({ message: "Lower Than 3 Characters", code: 1, cause: "last_name" });
//     return value;
//   },
//   age: (value) => {
//     if (typeof value !== "number") ErrorHandler.create({ message: "Invalid Data Type", code: 1, cause: "age" });
//     if (value < 16) ErrorHandler.create({ message: "Should Be 16 Or Higher", code: 1, cause: "age" });
//     return value;
//   },
//   email: (value) => {
//     if (typeof value !== "string") ErrorHandler.create({ message: "Invalid Data Type", code: 1, cause: "email" });
//     if (value.length < 6) ErrorHandler.create({ message: "Lower Than 6 Characters", code: 1, cause: "email" });
//     if (!new RegExp("[\\w]+@[\\w]+\\.[a-zA-Z0-9]{2,}").test(value)) ErrorHandler.create({ message: "Invalid Format", code: 1, cause: "email" });
//     return value;
//   },
//   role: (value) => {
//     if (!["USER", "PREMIUM", "ADMIN"].includes(value)) ErrorHandler.create({ message: "Invalid Data Type", code: 1, cause: "role" });
//     return value;
//   },
//   password: (value) => {
//     if (typeof value !== "string") ErrorHandler.create({ message: "Invalid Data Type", code: 1, cause: "password" });
//     if (value.length < 8) ErrorHandler.create({ message: "Lower Than 8 Characters", code: 1, cause: "password" });
//     return value;
//   },
// };

export default class UserDTO {
  constructor(user, to) {
    to ? this.#options[to](user) : ErrorHandler.create({ message: "No DTO Selected", code: 0 });
  }
  #options = {
    newToStore: ({ first_name, last_name, age, email, password }) => {
      this.first_name = first_name;
      this.last_name = last_name;
      this.age = age;
      this.email = email;
      this.password = password;
    },
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
