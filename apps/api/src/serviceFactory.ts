import { BankingService } from './services';

export default class ServiceFactory {
  public banking: typeof BankingService;

  constructor() {
    this.banking = BankingService;
  }
}
