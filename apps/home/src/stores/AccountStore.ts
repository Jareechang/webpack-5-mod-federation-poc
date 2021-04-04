import {
  EmitEvents
} from '../constants';

class AccountStore {
  private isLoggedIn : boolean;

  constructor(emitter) {
    this.emitter = emitter;
    this.isLoggedIn = false;
  }

  public getState() {
    return {...this};
  }

  public setIsLoggedIn(v: boolean) {
    this.isLoggedIn = v;
    this.emitter.emit(EmitEvents.AccountStateChanged);
  }
}

export default AccountStore;
