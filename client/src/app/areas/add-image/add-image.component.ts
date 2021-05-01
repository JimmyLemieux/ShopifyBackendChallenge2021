import { Component, OnInit } from '@angular/core';
import { AddImageWebService } from './add-image-web.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  imageUrlText: string;
  constructor(private _addImageWebService: AddImageWebService,
    private _toastr: ToastrService,
    private _route: Router) { }

  ngOnInit(): void {
  }

  addImage() {
    this._addImageWebService.addImage(this.imageUrlText).subscribe(res => {
      console.log(res);
      this._toastr.success('Created the image. Redirecting...', 'Image Creation');
      this._toastr.info(`Google AI recognized features: ${res.tags}`)
      this._route.navigate(['/']);
    }, error => {
      this._toastr.error('Unable to add the image. Ensure image is a public URL', 'Image Creation Error');
    })
  }
}
