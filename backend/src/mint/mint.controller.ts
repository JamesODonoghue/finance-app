import { Controller, Get } from '@nestjs/common';
import { MintService } from './mint.service';
import { Balance } from './interfaces/interfaces';

@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) { }

  @Get('balance')
  balance(): Balance {
    return this.mintService.getBalance();
  }

  @Get('login')
  async login(): Promise<any> {
    let result = await this.mintService.login();
    return result;
  }
}