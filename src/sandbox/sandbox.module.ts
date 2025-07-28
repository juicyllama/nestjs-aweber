import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AWeberModule } from "../index";
import { SandboxService } from "./sandbox.service";
import { SandboxController } from "./sandbox.controller";
import { AccountsModule } from "../aweber/accounts/accounts.module";
import { AuthModule } from "../aweber/auth/auth.module";
@Module({
  imports: [
    ConfigModule.forRoot(), 
    AWeberModule,
    AuthModule,
    AccountsModule
  ],
  controllers: [SandboxController],
  providers: [SandboxService],
  exports: [SandboxService],
})
export class SandboxModule {}
