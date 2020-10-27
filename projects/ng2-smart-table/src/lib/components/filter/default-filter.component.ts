import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FilterDefault} from "./filter-default";

@Component({
  selector: 'default-table-filter',
  template: `
    <ng-container [ngSwitch]="column.getFilterType()">
      <select-filter *ngSwitchCase="'list'"
                     [query]="query"
                     [ngClass]="inputClass"
                     [column]="column"
                     (filter)="onFilter($event)">
      </select-filter>
      <checkbox-filter *ngSwitchCase="'checkbox'"
                       [query]="query"
                       [ngClass]="inputClass"
                       [column]="column"
                       (filter)="onFilter($event)"
                       (sFormControl)="onSFormControl($event)">
      </checkbox-filter>
      <completer-filter *ngSwitchCase="'completer'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </completer-filter>
      <input-filter *ngSwitchDefault
                    [query]="query"
                    [ngClass]="inputClass"
                    [column]="column"
                    (filter)="onFilter($event)"
                    (sFormControl)="onSFormControl($event)">
      </input-filter>
    </ng-container>
  `,
})
export class DefaultFilterComponent extends FilterDefault {
  @Input() query: string;
  @Output() filter = new EventEmitter<any>();

  formControl: any;

  onSFormControl($event: any) {
    this.formControl = $event.control;
  }

  onFilter(query: string) {
    this.filter.emit({
      search: query,
      field: this.column.id,
      control: this.formControl,
   });
 }
}
