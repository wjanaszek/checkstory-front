import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeUrl'})
export class SafeUrl implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(html): any {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }
}
