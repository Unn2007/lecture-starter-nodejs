import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  getAll() {
    return fighterRepository.getAll();
  }

  getById(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      const error = new Error("Fighter not found");
      error.status = 404;
      throw error;
    }
    return fighter;
  }




}

const fighterService = new FighterService();

export { fighterService };
