import { Component, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';

/*
 * @ Annotations are called DECORATORS in ng
 */
@Component({
  selector: 'app-root', /* Tag to include this component in other files */
  templateUrl: './app.component.html', /* html for this component */
  styleUrls: ['./app.component.css'] /* List of CSS for this component */
})
export /* export = public in Java, without it its a private class */ class AppComponent implements OnInit {

  /* #1 Runs when class is created */
  constructor() { }

  /*
   * #2 Runs when class is instantiated
   * Is a life cycle method implemented in OnInit interfaceImpl
   */
  ngOnInit() { }

  /*
   * To access a child component in TypeScript, name the component in html
   * file using #<name>. Create a variable of child component class type and
   * inject it with instance of component used in parent by #name tagging it.
   * To inject an instance use @ViewChild decorator with # tag name declared
   * on the component.
   */
  @ViewChild("footer")
  footerComponent:FooterComponent;

  title = 'AngularLessonInCode';

  setAccessTime() {
    return new Date().toString();
  }

  setCopyrightOwner( ){
    this.footerComponent.copyrightOwner = 'AxemanDev';
  }
}
