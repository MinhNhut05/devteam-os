import { Logger, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const url = config.get<string>('REDIS_URL');
        if (!url) {
          new Logger('AuthCache').warn(
            'REDIS_URL not set — OTP cache falling back to in-memory (will not survive restart)',
          );
          return { ttl: 5 * 60 * 1000, max: 1000 };
        }
        const parsed = new URL(url);
        return {
          store: await redisStore({
            host: parsed.hostname,
            port: parsed.port ? Number(parsed.port) : 6379,
            username: parsed.username || undefined,
            password: parsed.password || undefined,
            db: parsed.pathname && parsed.pathname.length > 1 ? Number(parsed.pathname.slice(1)) : 0,
            ttl: 5 * 60 * 1000,
          }),
        };
      },
    }),
    // Register Passport with default strategy 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Register JWT module asynchronously to read env variables
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '15m',
        },
      }),
    }),

    // Import UsersModule so AuthService can use UsersService
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
