import { DocumentData } from '@angular/fire/firestore';

export type Document = DocumentData & { id: string };
