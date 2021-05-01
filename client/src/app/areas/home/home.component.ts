import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeWebService } from './home-web.service';
import { ImagesModel } from './models/images-model';
import {MatDialog} from '@angular/material/dialog';
import {ImageModalComponent} from './modal/image-modal/image-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private _homeWebService: HomeWebService,
    private dialog: MatDialog) { }
  value: string;
  imageResponse: ImagesModel[] = [];

  ngOnInit(): void {
    this._homeWebService.getImagesByKeyword(this.value).subscribe(value => {
      value.forEach(element => {
        let data = JSON.parse(element);
        let tags: string[] = [];
        data.tags.forEach(element => {
          tags.push(element.toLowerCase());
        });
        this.imageResponse.push(new ImagesModel(data.name, tags, data.imageUrl));
        console.log(this.imageResponse);
      });
    })
  }
  
  ngOnDestroy(): void {
    console.log(this.value)
  }

  openDialog(imageUrl: string, imageName: string, tags: string[]) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: '800px',
      data: {name: imageName, imageUrl: imageUrl, tags: tags}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  searchImages() {
  }
}
