import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  getAll() {
    return fighterRepository.getAll();
  }



}

const fighterService = new FighterService();

export { fighterService };
