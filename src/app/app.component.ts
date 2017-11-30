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
    this.action$ = actionService.actions$.asObservable();
  }

  updateIsActive(action: Action, isActive: boolean) {
    this.isRequesting = true;
    const newAction: Action = { ...action, ...{ active: isActive } };
    this.actionService
      .putAction(newAction)
      .do(_ => this.isRequesting = false)
      .subscribe();
  }

}
