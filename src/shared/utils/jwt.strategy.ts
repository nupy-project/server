import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { envs } from 'src/shared';
import { UserDocument, UserModel } from 'src/features/user/models/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.JWT_SECRET,
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.userModel.findById(payload.id);
    // return { id: user._id, roles: user.roles }; // Devolvemos el ID y los roles del usuario

    console.log('user =>>>>>>',user)
    return user;
  }
}