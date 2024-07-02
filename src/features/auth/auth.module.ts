import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtHandle, JwtStrategy } from 'src/shared';
import { UserModel, UserSchema } from '../user/models/user.schema';


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      // { name: Seller.name, schema: SellerSchema },
      // { name: Buyer.name, schema: BuyerSchema },

    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtHandle],
  exports: [JwtHandle],
})
export class AuthModule {}
