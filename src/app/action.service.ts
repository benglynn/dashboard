import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

export interface Action {
  type: string;
  active: boolean;
}

interface ActionsResponse {
  actions: Action[];
}

@Injectable()
export class ActionService {

  readonly uri = 'https://us-central1-state-service.cloudfunctions.net/actions';

  constructor( private http: HttpClient ) {}

  getActions (): Observable<Action[]> {
    return this.http.get<ActionsResponse>(this.uri)
    .map(response => response.actions);
    // return Observable.of([{ type: 'A_TEST_ACTION', active: true }]);
  }

}
