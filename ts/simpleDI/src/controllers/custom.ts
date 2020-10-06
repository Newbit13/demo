import {Inject} from '../libs/di/Inject'
import {LogService} from '../services/log';

export class CustomerController {
  // 使用 Inject 注入
  @Inject()
  private log!: LogService;

  public main(): void {
    this.log.info("hahahah");
  }
}
