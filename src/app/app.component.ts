import {Component} from '@angular/core';
import {UploadOutput} from 'ngx-uploader';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pizzas: Observable<any[]>;
  pizza: any = null;
  pizzaCollection;

  constructor() {
  }


  addPizza() {
    const pizza = {
      name: this.pizza.name,
      description: this.pizza.description,
    };
    console.log(pizza);
  }


  deletePizza(pizza) {
  }


  uploadFile(id) {

  }

  updateUrl(id: string, url: string) {

  }

  cancel() {
    this.pizza = null;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      const file = output.file.nativeFile;
      this.pizza = {
        name: file.name.split('.')[0],
        description: `${file.size % 15} $`,
        file: file
      };
      this.getFilePreview(file);
    }
  }

  private getFilePreview(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.pizza.preview = event.target['result'];
    };
    reader.readAsDataURL(file);
  }
}
