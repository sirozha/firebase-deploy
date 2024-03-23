import { inject, Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Functions } from '@angular/fire/functions';
import {
  DocumentData,
  Firestore,
  QueryConstraint,
  SetOptions,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from '@angular/fire/storage';

import { Document } from '../models/firebase.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private fireStorage = inject(Storage);
  private fireFunctions = inject(Functions);

  constructor() {}

  createId() {
    return doc(collection(this.firestore, 'id')).id;
  }

  getCollection(path: string, queries?: QueryConstraint[]) {
    const collectionRef = collection(this.firestore, path);
    return collectionData(
      !queries ? collectionRef : query(collectionRef, ...queries),
      { idField: 'id' }
    );
  }

  getDocument(path: string, id: string) {
    const documentRef = doc(this.firestore, `${path}/${id}`);
    return docData(documentRef, { idField: 'id' });
  }

  setDocument(path: string, document: Document, options: SetOptions = {}) {
    document.id = document.id || this.createId();
    const documentRef = doc(this.firestore, `${path}/${document.id}`);
    return setDoc<DocumentData, DocumentData>(documentRef, document, options);
  }

  updateDocument(path: string, document: Partial<Document> & { id: string }) {
    const documentRef = doc(this.firestore, `${path}/${document.id}`);
    return updateDoc(documentRef, document);
  }

  deleteDocument(path: string, id: any) {
    const documentReference = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(documentReference);
  }

  public uploadFile(
    path: string,
    documentId: string,
    file: File | string
  ): Observable<string> {
    const id = Math.random().toString(36).substring(2);
    const storageRef = ref(this.fireStorage, `${path}/${documentId}/${id}`);
    return from(
      typeof file !== 'string'
        ? uploadBytes(storageRef, file)
        : uploadString(storageRef, file, 'base64', {
            contentType: 'image/jpeg',
          })
    ).pipe(switchMap(() => getDownloadURL(storageRef)));
  }
}
