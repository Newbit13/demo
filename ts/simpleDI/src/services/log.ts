import {Service} from '../libs/di/Service'

@Service(true)
export class LogService {
    public debug(...args: any[]): void {
      console.debug('[DEB]', new Date(), ...args);
    }
  
    public info(...args: any[]): void {
      console.info('[INF]', new Date(), ...args);
    }
  
    public error(...args: any[]): void {
      console.error('[ERR]', new Date(), ...args);
    }
  }