import {AbstractControl} from '@angular/forms';

export function roundTimeValidator() {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = /^[012][0-9]:[0-5][0-9]$/.test(control.value);
    return valid ? null : { time: { value: control.value } };
  };
}
