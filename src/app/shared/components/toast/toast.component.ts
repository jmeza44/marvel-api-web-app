import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'marvel-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  @Input() type: string = '';
  @Input() title: string = '';
  @Input() message: string = '';

  constructor(
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }

  dismiss() {
    this.cdRef.detach();
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    if (nativeElement.parentNode) {
      nativeElement.parentNode.removeChild(nativeElement);
    }
  }
}
