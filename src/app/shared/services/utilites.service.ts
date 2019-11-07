import { Injectable } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilitesService {

  constructor() { }

  //FIREBASE CONVERTER
  converter(res: AngularFireList<unknown>) {
    return res.snapshotChanges().pipe(map(changes => {
      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() }))
    })
    )
  }

}
