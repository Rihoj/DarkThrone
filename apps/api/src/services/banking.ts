import { Context } from '../app';
import PlayerModel from '../models/player';

export class BankingService {
  private _ctx: Context;

  constructor(ctx: Context) {
    this._ctx = ctx;
  }

  async deposit(player: PlayerModel, amount: number): Promise<void> {
    this._ctx.logger.debug({ amount }, 'Depositing gold');

    player.gold -= amount;
    player.goldInBank += amount;

    await this._ctx.daoFactory.player.createBankHistory(
      this._ctx.logger,
      player.id,
      amount,
      'deposit',
    );

    await player.save();
  }

  async withdraw(player: PlayerModel, amount: number): Promise<void> {
    this._ctx.logger.debug({ amount }, 'Withdrawing gold');

    player.gold += amount;
    player.goldInBank -= amount;

    await this._ctx.daoFactory.player.createBankHistory(
      this._ctx.logger,
      player.id,
      amount,
      'withdraw',
    );

    await player.save();
  }
}
