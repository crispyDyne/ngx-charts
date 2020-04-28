import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-circle]',
  template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
      [attr.data-series]="series"
      [attr.data-index]="index.toString()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleComponent implements OnChanges {
  @Input() cx;
  @Input() cy;
  @Input() r;
  @Input() fill;
  @Input() stroke;
  @Input() data;
  @Input() series;
  @Input() classNames;
  @Input() circleOpacity;
  @Input() pointerEvents;
  @Input() uid: string;
  @Input() index: number;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.select.emit(this.data);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
    this.classNames += 'circle' + ' draggable-' + this.uid;
  }
}
