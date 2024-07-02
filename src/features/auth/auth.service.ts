import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from 'src/shared';
import { UserDocument, UserModel } from '../user/models/user.schema';
import { UserRole } from '../user/interfaces/roles.interface';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;

    const userExist = await this.userModel.findOne({ email: userLoginBody.email });
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist.toObject();
    delete userFlat.password;

    const payload = { id: userFlat._id, roles: userFlat.roles };

    const token = this.jwtService.sign(payload);

    const data = { token, user: userFlat };

    return data;
  }

  public async register(userBody: RegisterAuthDto, role: UserRole) {
    const { password, email, ...user } = userBody;
    const userParse = { ...user, email, password: await generateHash(password), roles: [role] };

    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(userParse);

    if (role === UserRole.USER) {
      let walletAddress: string;
      let walletPrivateKey: string;

      try {
        const wallet = ethers.Wallet.createRandom();
        walletAddress = wallet.address;
        walletPrivateKey = wallet.privateKey;
      } catch (error) {
        walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
        walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
      }

      newUser.walletAddress = walletAddress;
      newUser.walletPrivateKey = walletPrivateKey; // Omitir guardar la privateKey si no es necesario

      await newUser.save(); // Guardar los cambios en el usuario
    }

    const payload = { id: newUser._id, roles: newUser.roles };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }
}
