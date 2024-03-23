export enum Role {
  admin = 'admin',
  owner = 'owner',
  manager = 'manager',
}

export type RolesType = { [role in Role]: string };

export const roles: RolesType = {
  [Role.admin]: 'Admin',
  [Role.owner]: 'Owner',
  [Role.manager]: 'Manager',
};
