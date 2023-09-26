import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ImageCompressService, ResizeOptions, IImage } from 'ng2-image-compress';
import { ProjectAttachments } from '../models/ProjectAttachments';

@Injectable({
  providedIn: 'root'
})
export class ImagesCompressService {

  isImageValid: boolean = true;

  attachments: ProjectAttachments;
  compresseImages: Array<ProjectAttachments>

  constructor(public _sharedService: SharedService) { }


    uploadFiles($event) {
    // var parentRef = this;
    if ($event.target.files.length > 0) {
      var totalImages = $event.target.files.length;
      for (let index = 0; index < totalImages; index++) {
        var img = $event.target.files[index];
        if (img.type != "image/png" && img.type != "image/jpg" && img.type != "image/jpeg" && img.type != "image/gif" && img.type != "image/tiff") {
          this.isImageValid = false;
        }
      }
      if(this.isImageValid == true)
      {
        //image compress options
        var option: ResizeOptions = new ResizeOptions();
        option.Resize_Quality = 80;
        option.Resize_Type = 'image/jpg';

        //compress image
        return ImageCompressService.filesToCompressedImageSourceEx($event.target.files, option)
      } 
      else {
        $event = undefined;
        totalImages = 0;
        this.isImageValid = true;
        this._sharedService.loading = false;
        this._sharedService.warning("Invalid Files! Only images are allowed.");
      }
    }
  }
}
