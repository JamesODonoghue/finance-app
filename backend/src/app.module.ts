import { AuthModule } from './auth/auth.module';
import { MintModule } from './mint/mint.module';
import { GoogleModule } from './google/google.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [MintModule, GoogleModule, AuthModule],
})
export class AppModule {}
