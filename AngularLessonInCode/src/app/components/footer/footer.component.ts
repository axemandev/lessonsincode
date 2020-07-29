import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  copyrightOwner:string;

  /*
   * @Input('name') allows access to the variable from parent component
   * using 'name' provided in decorator.
   */
  @Input('accTime')
  accessedTime:string;

  constructor() { }

  ngOnInit() {
  }

}
