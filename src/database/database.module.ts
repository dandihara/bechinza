import { Module } from '@nestjs/common';
import { UserRepositoryService } from './service/user.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class DatabaseModule {}
