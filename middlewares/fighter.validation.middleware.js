import { FIGHTER } from "../models/fighter.js";

const allowedFields = Object.keys(FIGHTER).filter(key => key !== 'id');

const isNumber = value => typeof value === 'number' && !isNaN(value);
const inRange = (val, min, max) => isNumber(val) && val >= min && val <= max;

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const data = req.body;

  
  if ('id' in data) {
    res.err = new Error("Field 'id' should not be provided");
    return next();
  }

 
  const extraFields = Object.keys(data).filter(key => !allowedFields.includes(key));
  if (extraFields.length) {
    res.err = new Error(`Unexpected field(s): ${extraFields.join(', ')}`);
    return next();
  }

  
  const requiredFields = allowedFields.filter(field => field !== 'health');
  for (const field of requiredFields) {
    if (!data[field] && data[field] !== 0) {
      res.err = new Error(`Field '${field}' is required`);
      return next();
    }
  }

  
  if (!inRange(data.power, 1, 100)) {
    res.err = new Error("Power must be a number between 1 and 100");
    return next();
  }

  if (!inRange(data.defense, 1, 10)) {
    res.err = new Error("Defense must be a number between 1 and 10");
    return next();
  }

  if ('health' in data && !inRange(data.health, 80, 120)) {
    res.err = new Error("Health must be a number between 80 and 120");
    return next();
  }

  




  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update

  const data = req.body;

 
  if ('id' in data) {
    res.err = new Error("Field 'id' cannot be updated");
    return next();
  }

  const fields = Object.keys(data);

  
  if (!fields.length) {
    res.err = new Error("At least one field must be provided for update");
    return next();
  }

 
  const extraFields = fields.filter(key => !allowedFields.includes(key));
  if (extraFields.length) {
    res.err = new Error(`Unexpected field(s): ${extraFields.join(', ')}`);
    return next();
  }

 
  if ('power' in data && !inRange(data.power, 1, 100)) {
    res.err = new Error("Power must be a number between 1 and 100");
    return next();
  }

  if ('defense' in data && !inRange(data.defense, 1, 10)) {
    res.err = new Error("Defense must be a number between 1 and 10");
    return next();
  }

  if ('health' in data && !inRange(data.health, 80, 120)) {
    res.err = new Error("Health must be a number between 80 and 120");
    return next();
  }





  next();
};

export { createFighterValid, updateFighterValid };
