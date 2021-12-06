import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'widget-c-dropdown',
  templateUrl: './c-dropdown.component.html',
  styleUrls: ['./c-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CDropdownComponent),
    multi: true,
  }]
})
export class CDropdownComponent implements OnInit, ControlValueAccessor {

  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() buttonClassAttr: string = 'btn-primary';
  selectedOption: string;
  onChange: (_: any) => {};
  onTouched: (_: any) => {};

  constructor() {
  }

  @Input() optionDisplayForm: (option: string) => string = (option) => option;

  ngOnInit(): void {
    // todo delete: if not used
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.selectedOption = value;
  }

  changeSelectedOption(option: string) {
    this.selectedOption = option;
    this.onChange(option);
  }
}
