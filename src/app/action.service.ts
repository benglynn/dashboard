import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

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
  actions$ = new BehaviorSubject<Action[]>([]);

  constructor( private http: HttpClient ) {
    this.http.get<ActionsResponse>(this.uri)
      .map(response => response.actions)
      .subscribe(actions => this.actions$.next(actions));
  }

  putAction (action: Action): Observable<Action> {
    const body = { ...action }; delete body.id;
    const options = { params: { id: action.id.toString() } };
      return this.http.put<Action>(this.uri, body, options)
        .withLatestFrom(this.actions$)
        .do(([newAction, actions]) => {
          const newActions = actions
            .map((actionItem) => actionItem.id === newAction.id ? newAction : actionItem);
          this.actions$.next(newActions);
          return [newAction, actions];
        })
        .map(([newAction, actions]) => newAction);
  }

}
