import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  constructor(private firestore: AngularFirestore) {
    firestore.firestore.settings({timestampsInSnapshots: true});
  }

  load() {

  }
}
