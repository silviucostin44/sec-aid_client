import {Component} from '@angular/core';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons';
import ro from '../../../../assets/text/ro.json';
import {SecurityService} from '../../../services/security.service';

@Component({
  selector: 'widget-account-tool',
  templateUrl: './account-tool.component.html',
  styleUrls: ['./account-tool.component.scss']
})
export class AccountToolComponent {
  readonly text = ro.HOME;
  readonly userIcon = faUserCircle;

  username: string;

  constructor(private securityService: SecurityService) {
    this.username = this.securityService.getUsername();

    this.securityService.authEvents.subscribe(() => {
      this.username = this.securityService.getUsername();
    });
  }

  logout() {
    this.securityService.logout();
  }
}
