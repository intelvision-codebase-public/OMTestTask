import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/enums/filter.enum';

@Component({
    selector: 'app-filters',
    templateUrl: 'filters.component.html'
})

export class FiltersComponent implements OnInit {

    public filterEnum = Filter;
    @Input() currentFilter;
    @Output() filterTodosEvent = new EventEmitter<Filter>();

    constructor() { }

    ngOnInit() { }

    filterTodos(filter: Filter) {
        this.filterTodosEvent.emit(filter)
    }
}