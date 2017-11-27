import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, ActionService } from './action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  action$: Observable<Action[]>;
  isRequesting = false;

  constructor( private actionService: ActionService ) {
    this.action$ = actionService.observable();
  }

  updateIsActive(action: Action, isActive: boolean) {
    this.isRequesting = true;
    this.actionService
      .updateIsActive(action, isActive)
      .subscribe(newAction => this.isRequesting = false);
  }

}
