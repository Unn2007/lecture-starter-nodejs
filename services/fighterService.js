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

  create(fighterData) {
    const fighters = this.getAll();

    const nameExists = fighters.some(
      f => f.name.toLowerCase() === fighterData.name.toLowerCase()
    );
    if (nameExists) {
      throw new Error("Fighter name must be unique");
    }

   
    if (!('health' in fighterData)) {
      fighterData.health = 85;
    }

    return fighterRepository.create(fighterData);
  }




}

const fighterService = new FighterService();

export { fighterService };
