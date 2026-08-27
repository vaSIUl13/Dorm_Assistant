import { SetMetadata } from '@nestjs/common';
import { UserRoleType } from '@prisma/client';

export const ROLES_KEY = 'Roles';
export const Roles = (...Roles: UserRoleType[]) =>
  SetMetadata(ROLES_KEY, Roles);
