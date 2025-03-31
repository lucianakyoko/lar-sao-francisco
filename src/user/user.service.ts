import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    await this.ensureAdminUser();
  }

  private async ensureAdminUser(): Promise<void> {
    const existingAdmin = await this.userModel.findOne({ username: 'admin' });

    if (!existingAdmin) {
      const adminPassword: string | undefined = process.env.ADMIN_PASSWORD;

      if (!adminPassword) {
        console.error('Erro:_PASSWORD não está definido.');
        return;
      }

      const hashedPassword: string = await bcrypt.hash(adminPassword, 10);

      await this.userModel.create({
        username: 'admin',
        password: hashedPassword,
      });
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
