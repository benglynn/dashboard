import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

export interface Action {
  type: string;
  active: boolean;
  id: number;
}

interface ActionsResponse {
  actions: Action[];
}

@Injectable()
export class ActionService {

  readonly uri = 'https://us-central1-state-service.cloudfunctions.net/actions';
  actions$ = new Subject<Action[]>();

  constructor( private http: HttpClient ) {
    this.updateActions();
  }

  private updateActions() {
    this.http.get<ActionsResponse>(this.uri)
      .map(response => response.actions)
      .subscribe(actions => this.actions$.next(actions));
  }

  private getActions(): Observable<Action[]> {
    return this.http.get<ActionsResponse>(this.uri)
    .map(response => response.actions);
  }

  observable (): Observable<Action[]> {
    return this.actions$.asObservable();
  }

  updateIsActive (action: Action, isActive: boolean): Observable<Action> {
    const body = { type: action.type, active: isActive };
    const options = { params: { id: action.id.toString() } };
    return this.http
      .put<Action>(this.uri, body, options)
      .switchMap(newAction => this.getActions())
      .do(actions => this.actions$.next(actions))
      .filter(actions => action.id === action.id)
      .map(actions => actions[0]);
  }

}
