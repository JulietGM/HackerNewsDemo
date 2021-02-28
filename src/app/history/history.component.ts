import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../services/services.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(public s: ServicesService, private modal: NgbModal, public router: Router) {
  }

  BHistirys: any = [];
  TenBestHistorys: any = [];
  arrayHistorys: any = [];
  closeResult: string;
  urlImages = 'assets/img/';
  images = [this.urlImages + 'img_13.png', this.urlImages + 'img_7.png', this.urlImages + 'img_11.png'];

  ngOnInit(): void {
    this.getInfoHistorys();
  }




  getInfoHistorys(): void{
    this.s.BestHistorys().subscribe((data: any) => {
      this.BHistirys = data;
      this.TenBestHistorys = this.BHistirys.slice(0, 10);
      this.TenBestHistorys.forEach((id, index) => {
        this.s.InfoHistory(id).subscribe(( inf: any) => {
          this.arrayHistorys[index] = inf;
        });
      });
    });
  }

  showHistory( id ): void{
    this.router.navigate(['showHistory', id], );
  }




}
