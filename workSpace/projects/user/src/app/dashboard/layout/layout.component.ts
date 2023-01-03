import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isToggle:boolean=false;

  constructor(private router:Router,private spinner:NgxSpinnerService) { }

  toggle() {
    this.isToggle = !this.isToggle;
  }

  logout(){
    this.spinner.show();
    localStorage.removeItem('userToken');
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/login']);
    },2000)
  }
  ngOnInit(): void {
  }

}
