import {Component} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent  {
  title = 'uploadTest';



  constructor(private _bottomSheet: MatBottomSheet) {

  }

  openBottomSheet(): void {
    this._bottomSheet.open(UploadBottomSheetComponent);
  }
}

@Component({
  selector: 'app-upload-bottom-sheet',
  templateUrl: 'uploadBottomSheet.html',
  providers: []
})
export class UploadBottomSheetComponent {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;

  uploads: any[];
  allProgress: Observable<any>;

  constructor(private _bottomSheetRef: MatBottomSheetRef<UploadBottomSheetComponent>,
              private afStorage: AngularFireStorage) {}

  upload(event) {

    this.uploads = [];
    const filelist = event.target.files;
    const allProgress: Observable<number>[] = [];

    for (const file of filelist) {
      const id = Math.random().toString(36).substring(2);
      const ref = this.afStorage.ref(id);
      const task = ref.put(file);
      const uploadState = task.snapshotChanges().pipe(map(s => s.state));
      const uploadProgress = task.percentageChanges();
      allProgress.push(uploadProgress);

      const uploadTrack = {
        fileName: file.name,
        uploadProgress,
        uploadState,
        task
      };
      this.uploads.push(uploadTrack);
    }

  }

  closeBottomSheet(): void {
    this._bottomSheetRef.dismiss();
  }
}
