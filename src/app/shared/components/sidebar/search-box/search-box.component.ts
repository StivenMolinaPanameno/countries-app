import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {Subject, Subscription, debounceTime} from 'rxjs';
@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer:Subject<string> = new Subject<string>()
  @Input()
  public placeholder:string ='';

  @ViewChild('txtSearchInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();
  private debouncerSuscription?:Subscription;

  @Input()
  public initialValue?:string;

  ngOnInit(): void {
      this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);

      })

  }
  ngOnDestroy(): void {
this.debouncerSuscription?.unsubscribe;
  }



  tag():void{
    this.onValue.emit(this.tagInput.nativeElement.value);

  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }



}
