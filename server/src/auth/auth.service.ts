import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRoleType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        passwordHash, // обов'язково зберігаємо хеш
        firstName: dto.firstName,
        lastName: dto.lastName,
        roomId: dto.roomId,
        roles: {
          create: {
            role: UserRoleType.STUDENT,
          },
        },
      },
      include: {
        roles: true,
      },
    });

    const tokens = await this.generateTokens(
      newUser.id,
      newUser.email,
      newUser.roles.map((r) => r.role),
    );

    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  async generateTokens(userId: number, email: string, roles: string[]) {
    const payload = { sub: userId, email, roles };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m') as any,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d') as any,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(LoginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
        where: {email: LoginDto.email},
        include: {
            roles: true,
        }
    })
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(LoginDto.password, user.passwordHash);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(
        user.id,
        user.email,
        user.roles.map((r) => r.role)
    )

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        tokens,
    }
  }
}