import { User as FirebaseUser } from '@angular/fire/auth';
import { Role } from './role.model';

export interface User extends Partial<FirebaseUser> {
  id: string | null;
  phone: string | null;
  name: string | null;
  role: Role | null;
  providerId: string;
}
