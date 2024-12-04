import { PlayerRow } from '../../../src/daos/player';
import { Context } from '../../../src/app';
import PlayerModel from '../../../src/models/player';
// eslint-disable-next-line @nx/enforce-module-boundaries
import ServiceFactory from 'apps/api/src/serviceFactory';

const mockPlayerRow: PlayerRow = {
  id: 'PLR-01HQH3NXAG7CASHPCETDC4HE0V',
  user_id: 'USR-01HQH3NPM1P19T8133DH5P0FJT',
  display_name: 'TestPlayer',
  race: 'human',
  class: 'fighter',
  created_at: new Date(),
  attack_turns: 10,
  gold: 20,
  gold_in_bank: 40,
  experience: 30,
  overall_rank: 1,
  structureUpgrades: {
    fortification: 0,
    housing: 0,
  },
};

describe('Banking Service', () => {
  describe('depositGold', () => {
    it('should update the player gold and goldInBank', async () => {
      const mockCTX = {
        daoFactory: {
          player: {
            createBankHistory: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue(mockPlayerRow),
          },
        },
        serviceFactory: new ServiceFactory(),
        logger: {
          debug: jest.fn(),
        },
      } as unknown as Context;
      const player = new PlayerModel(mockCTX, mockPlayerRow, []);
      const saveMock = jest.fn().mockResolvedValue({});
      player.save = saveMock;
      await mockCTX.serviceFactory.banking.deposit(mockCTX, player, 10);
      expect(mockCTX.logger.debug).toHaveBeenCalledWith(
        { amount: 10 },
        'Depositing gold',
      );
      expect(mockCTX.daoFactory.player.createBankHistory).toHaveBeenCalledWith(
        mockCTX.logger,
        player.id,
        10,
        'deposit',
      );
      expect(saveMock).toHaveBeenCalled();
    });
  });
  describe('withdrawGold', () => {
    it('should update the player gold and goldInBank', async () => {
      const mockCTX = {
        daoFactory: {
          player: {
            createBankHistory: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue(mockPlayerRow),
          },
        },
        serviceFactory: new ServiceFactory(),
        logger: {
          debug: jest.fn(),
        },
      } as unknown as Context;
      const player = new PlayerModel(mockCTX, mockPlayerRow, []);
      const saveMock = jest.fn().mockResolvedValue({});
      player.save = saveMock;
      await mockCTX.serviceFactory.banking.withdraw(mockCTX, player, 10);
      expect(mockCTX.logger.debug).toHaveBeenCalledWith(
        { amount: 10 },
        'Withdrawing gold',
      );
      expect(mockCTX.daoFactory.player.createBankHistory).toHaveBeenCalledWith(
        mockCTX.logger,
        player.id,
        10,
        'withdraw',
      );
      expect(saveMock).toHaveBeenCalled();
    });
  });

  // TODO: Need to update to use bankHistory DAO once created.
  // expand tests to include actual bank history
  describe('fetchBankHistory', () => {
    it('should return the bank history for the player', async () => {
      const mockCTX = {
        daoFactory: {
          player: {
            fetchBankHistory: jest.fn().mockResolvedValue([]),
          },
        },
        serviceFactory: new ServiceFactory(),
        logger: {
          debug: jest.fn(),
        },
      } as unknown as Context;
      const player = new PlayerModel(mockCTX, mockPlayerRow, []);
      const bankHistory = await mockCTX.serviceFactory.banking.fetchBankHistory(
        mockCTX,
        player,
        new Date(),
      );
      expect(bankHistory).toEqual([]);
    });
  });
});
