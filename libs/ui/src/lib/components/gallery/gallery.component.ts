import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  selectedImageUrl: string;
  @Input() images: string[];

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }
  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }
  get hasImages() {
    return this.images?.length > 0;
  }
}
