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

  constructor( private actionService: ActionService ) {
    this.action$ = actionService.getActions();
    this.action$.subscribe(console.log);
  }

}
