import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly defauiltOptions: LoadingOptions = {
    spinner: 'bubbles',
    translucent: true,
  };

  constructor(private loadingController: LoadingController) {}

  async present(loadingOptions: LoadingOptions) {
    const options = {
      ...this.defauiltOptions,
      ...loadingOptions,
    };

    const loading = await this.loadingController.create(options);
    await loading.present();

    return loading;
  }
}
