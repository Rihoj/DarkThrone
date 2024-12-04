import { Context } from '../app';
import { BankHistory } from '../lib/BankHistory';
import PlayerModel from '../models/player';

export class BankingService {
  private _ctx: Context;

  constructor(ctx: Context) {
    this._ctx = ctx;
  }

  static async fetchBankHistory(
    ctx: Context,
    player: PlayerModel,
    dateFrom: Date,
  ): Promise<BankHistory[]> {
    return await ctx.daoFactory.player.fetchBankHistory(
      ctx.logger,
      player.id,
      dateFrom,
    );
  }

  static async deposit(
    ctx: Context,
    player: PlayerModel,
    amount: number,
  ): Promise<void> {
    ctx.logger.debug({ amount }, 'Depositing gold');

    player.gold -= amount;
    player.goldInBank += amount;

    await ctx.daoFactory.player.createBankHistory(
      ctx.logger,
      player.id,
      amount,
      'deposit',
    );

    await player.save();
  }

  static async withdraw(
    ctx: Context,
    player: PlayerModel,
    amount: number,
  ): Promise<void> {
    ctx.logger.debug({ amount }, 'Withdrawing gold');

    player.gold += amount;
    player.goldInBank -= amount;

    await ctx.daoFactory.player.createBankHistory(
      ctx.logger,
      player.id,
      amount,
      'withdraw',
    );

    await player.save();
  }
}
