import { Component } from "@angular/core";

@Component({
  selector: 'main-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})

export class WrapperComponent {
  title = 'wrapper';
  public sayHello = () => {
    console.log('Hello!')
  };
}