import {Component, Inject, InjectionToken} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'uploadTest';



  constructor(private _bottomSheet: MatBottomSheet) {
  }

  openBottomSheet(event): void {
    this._bottomSheet.open(UploadBottomSheetComponent,{
      data: { event },
    });
  }
}

@Component({
  selector: 'app-upload-bottom-sheet',
  templateUrl: 'uploadBottomSheet.html',
  styleUrls: ['uploadBottomSheet.css']
})
export class UploadBottomSheetComponent {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  toggleIcon = 'expand_more';
  cancelIcon = 'delete';
  filesNum: string;
  uploads: any[];
  allProgress: Observable<any>;
  completed: boolean;


  constructor(private _bottomSheetRef: MatBottomSheetRef<UploadBottomSheetComponent>,
              private afStorage: AngularFireStorage,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.upload(data.event);
  }

  upload(event) {

    this.uploads = [];
    const filelist = event.target.files;
    this.filesNum = filelist.length.toString();
    const allProgress: Observable<number>[] = [];
    // let downloadURL: Observable<string>;
    for (const file of filelist) {
      const id = Math.random().toString(36).substring(2);
      const ref = this.afStorage.ref(id);
      const task = ref.put(file);
      const uploadState = task.snapshotChanges().pipe(map(s => s.state));
      task.snapshotChanges().pipe(map(s => console.log(s)));
      const uploadProgress = task.percentageChanges();
      allProgress.push(uploadProgress);
      const fileSize = (file.size.toPrecision(2) / 1000000) + 'M';
      // task.snapshotChanges().pipe(map(s => s.ref.getDownloadURL()
      //   .then((url) => {
      //   downloadURL = url;
      //   console.log(url);
      // })))


      const uploadTrack = {
        fileName: file.name,
        fileSize,
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

  toggle(){
    if (this.toggleIcon === 'expand_more')
    {
      this.toggleIcon = 'expand_less';
    }
    else {
      this.toggleIcon = 'expand_more'
    }
  }
}
