import { Deposit } from '../models/Deposit';
import { Withdrawal } from '../models/Withdrawal';
import { Transfer } from '../models/Transfer';
import { Payment } from '../models/Payment';
import { Fee } from '../models/Fee';

const registry = {
  deposit: (data) => new Deposit(data),
  withdrawal: (data) => new Withdrawal(data),
  transfer: (data) => new Transfer(data),
  payment: (data) => new Payment(data),
  fee: (data) => new Fee(data) 
};

export function createMovement(data) {
  const creator = registry[data.type];
  if (!creator) {
    throw new Error(`Unknown movement type: ${data.type}`);
  }
  return creator(data);
}

export function registerMovement(typeName, creatorFn) {
  if (typeof creatorFn !== 'function') {
    throw new Error('creatorFn must be a function');
  }
  registry[typeName] = creatorFn;
}
export default createMovement;