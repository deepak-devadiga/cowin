import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @Input()
  slotsData: any;
  dataLoaded: boolean = false;

  constructor() { }

  openAccordion(e) {
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
      // acc[i].addEventListener("click", function () {
      e.target.classList.toggle("active");
      var panel = e.target.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
      // });
    }
  }
}
