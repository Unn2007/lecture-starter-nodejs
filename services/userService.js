import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAll() {
    return userRepository.getAll();
  }

  getById(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    return user;
  }

  create(userData) {
    const users = this.getAll();

    const emailExists = users.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (emailExists) throw new Error("Email already exists");

    const phoneExists = users.some((u) => u.phone === userData.phone);
    if (phoneExists) throw new Error("Phone already exists");

    return userRepository.create(userData);
  }

  update(id, userData) {
    const existing = this.getById(id);
    if (!existing) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    if (userData.email) {
      const emailExists = this.getAll().some(
        (u) =>
          u.email.toLowerCase() === userData.email.toLowerCase() && u.id !== id
      );
      if (emailExists) throw new Error("Email already exists");
    }

    if (userData.phone) {
      const phoneExists = this.getAll().some(
        (u) => u.phone === userData.phone && u.id !== id
      );
      if (phoneExists) throw new Error("Phone already exists");
    }

    return userRepository.update(id, userData);
  }

  delete(id) {
    const existing = this.getById(id);
    if (!existing) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
