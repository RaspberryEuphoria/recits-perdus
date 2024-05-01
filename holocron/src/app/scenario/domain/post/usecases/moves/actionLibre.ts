import { MoveId } from '../../entities/move';
import { ActionMove } from './actionMove';

export class ActionLibreMove extends ActionMove {
  moveId = MoveId.ACTION_LIBRE;

  async roll() {
    return await super.roll();
  }
}
