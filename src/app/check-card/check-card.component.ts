import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-check-card',
  templateUrl: './check-card.component.html',
  styleUrls: ['./check-card.component.scss']
})
export class CheckCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() paragraph:string;
  @Input() btnText:string;
  @Input() modalId:string;

  checked() {
    var dot = document.getElementById('check-dot');
    var dot_cont = document.getElementById('checker-cont');
    var checker = document.getElementById('checker');
    var checker_text = document.getElementById('checker-text');

    dot.style.transition = "background-color .5s, left .5s";
    dot_cont.style.transition = "background-color .5s";
    dot.style.backgroundColor = "white";
    dot_cont.style.backgroundColor = "#22C0FF";
    checker.style.backgroundColor = "white";
    checker.style.transition = "background-color .3s";
    checker_text.style.color = "#22C0FF";
    dot.style.left = "20%";
  }
  checknt() {
    var dot = document.getElementById('check-dot');
    var dot_cont = document.getElementById('checker-cont');
    var checker = document.getElementById('checker');
    var checker_text = document.getElementById('checker-text');
    
    dot.style.transition = "background-color .5s, left .5s";
    dot_cont.style.transition = "background-color .5s";
    dot.style.backgroundColor = "#22C0FF";
    dot_cont.style.backgroundColor = "white";
    checker.style.backgroundColor = "#22C0FF";
    checker.style.transition = "background-color .3s";
    checker_text.style.color = "white";
    dot.style.left = "5%";
  }
}
