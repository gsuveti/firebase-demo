import {Component} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireStorage} from 'angularfire2/storage';
import {UploadOutput} from 'ngx-uploader';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private pizzaCollection;
  private pizzas;
  private pizza: any = null;

  constructor(db: AngularFirestore, private storage: AngularFireStorage) {
    this.pizzaCollection = db.collection('/pizzas');
    this.pizzas = this.pizzaCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      const file = output.file.nativeFile;
      this.pizza = {
        name: file.name.split('.')[0],
        description: `${file.size % 15} $`,
        file: file
      };
      this.getPlaceholder(file);
    }
  }

  getPlaceholder(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.pizza.preview = event.target['result'];
    };
    reader.readAsDataURL(file);
  }

  addPizza() {
    const pizza = {
      name: this.pizza.name,
      description: this.pizza.description,
    };
    this.pizzaCollection.add(pizza).then((documentReference: firebase.firestore.DocumentReference) => {
      console.log('Document successfully added!');
      this.uploadFile(documentReference.id);
      // this.cancel();
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  }

  cancel() {
    this.pizza = null;
  }

  deletePizza(pizza) {
    this.pizzaCollection.doc(pizza.id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  uploadFile(id) {
    const task = this.storage.upload(this.pizza.file.name, this.pizza.file);
    // get notified when the download URL is available
    task.downloadURL().subscribe(url => {
        this.updateUrl(id, url);
      },
      (error) => {
        console.log(error);
      });
  }

  private updateUrl(id: string, url: string) {
    this.pizzaCollection.doc(id).update({url}).then(() => {
      console.log('Document successfully updated!');
      this.cancel();
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }
}
