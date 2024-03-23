import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, color: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message,
      color,
      duration,
    });
    toast.present();

    return toast;
  }
}
