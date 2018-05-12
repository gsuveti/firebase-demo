import {Component} from '@angular/core';
import {UploadOutput} from 'ngx-uploader';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireStorage} from 'angularfire2/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pizzas: Observable<any[]>;
  pizza: any = null;
  pizzaCollection;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.pizzaCollection = this.firestore.collection('/pizza');
    this.pizzas = this.pizzaCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    });
  }


  addPizza() {
    const pizza = {
      name: this.pizza.name,
      description: this.pizza.description,
    };
    console.log(pizza);

    this.pizzaCollection.add(pizza).then((doc) => {
      this.uploadFile(doc.id);
    });
  }


  deletePizza(pizza) {
    this.pizzaCollection.doc(pizza.id).delete();
  }


  uploadFile(id) {
    const task = this.storage.upload(this.pizza.file.name, this.pizza.file);
    task.downloadURL().subscribe(url => {
      this.updateUrl(id, url);
    });
  }

  updateUrl(id: string, url: string) {
    this.pizzaCollection.doc(id).update({url});
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
