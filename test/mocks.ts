import {EventEmitter} from '@angular/core';
import {noop, of} from 'rxjs';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';

export class MockEmptyClass {
}

export class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => '99'
    }
  };
}

export class MockSecurityService {
  authEvents = new EventEmitter();

  isSignedIn = () => false;

  getUsername = () => 'username';

  logout = () => noop();
}

export class MockToastrService {
  success = () => noop();
  error = () => noop();
}

export class MockBsModalService {
  show = () => ({
    content: {
      responseEmitter: of()
    }
  });

  hide = () => noop();
}

export class MockDatePipe {
  transform = () => new Date().toDateString();
}

export class MockFB {
  array = (controls) => new FormArray(controls);
  control = (state, validators) => new FormControl(state, validators);
  group = (controls, validators) => new FormBuilder().group(controls, validators);
}

export class MockGridComponent {
  addRow = () => noop();
  editRow = () => noop();
  closeRow = () => noop();
}

