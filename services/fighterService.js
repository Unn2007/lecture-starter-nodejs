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

  update(id, fighterData) {
    const existing = this.getById(id);
    if (!existing) {
      const error = new Error("Fighter not found");
      error.status = 404;
      throw error;
    }

    
    if (fighterData.name) {
      const nameExists = this.getAll().some(
        f => f.name.toLowerCase() === fighterData.name.toLowerCase() && f.id !== id
      );
      if (nameExists) throw new Error("Fighter name must be unique");
    }

    return fighterRepository.update(id, fighterData);
  }




}

const fighterService = new FighterService();

export { fighterService };
