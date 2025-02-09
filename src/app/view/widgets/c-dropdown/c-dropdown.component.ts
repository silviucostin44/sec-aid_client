import {Component, forwardRef, Input} from '@angular/core';
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
export class CDropdownComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() buttonType: string = 'primary';
  @Input() optionDisplayForm: (option: string) => string = (option) => option;
  selectedOption: string;
  onChange: (_: any) => {};

  onTouched: (_: any) => {};

  constructor() {
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

  changeSelectedOption(option: string): void {
    this.selectedOption = option;
    this.onChange(option);
  }

  getButtonClass(): string {
    return (this.selectedOption ? 'btn-' : 'btn-outline-') + this.buttonType;
  }
}
