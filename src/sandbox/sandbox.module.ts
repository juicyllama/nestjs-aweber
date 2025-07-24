import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AWeberModule } from "../index";

@Module({
  imports: [ConfigModule.forRoot(), AWeberModule],
})
export class SandboxModule {}
