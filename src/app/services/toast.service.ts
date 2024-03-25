import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defauiltOptions: ToastOptions = {
    duration: 3000,
    translucent: true,
  };

  constructor(private toastController: ToastController) {}

  async present(taostOptions: ToastOptions) {
    const options = {
      ...this.defauiltOptions,
      ...taostOptions,
    };

    const toast = await this.toastController.create(options);
    toast.present();

    return toast;
  }
}
