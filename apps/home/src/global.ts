// All shared globals go here
import mitt from 'mitt';
import * as stores from './stores';

export * from './context';
export * from './components';
export * from './constants';

export const emitter = mitt();
export const AccountStore = new stores.AccountStore(emitter);
