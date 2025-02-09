import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {isObservable} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  private readonly warningMessage = 'WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.';

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if (isObservable(component.canDeactivate())) {
      return (component.canDeactivate() as Observable<boolean>)
        .pipe(map(value => value ?
          true :
          confirm(this.warningMessage)));
    }
    return component.canDeactivate() ?
      true :
      confirm(this.warningMessage);
  }

}
