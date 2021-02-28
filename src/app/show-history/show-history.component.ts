import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {ServicesService} from '../services/services.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-history',
  templateUrl: './show-history.component.html',
  styleUrls: ['./show-history.component.css']
})
export class ShowHistoryComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  id_history: any;
  data_history: any = [];
  date_publication: any;
  ids_comments: any = [];
  arrayComments: any = [];
  closeResult: any;
    Months = ['Junary', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];

  constructor( private route: ActivatedRoute, public s: ServicesService, private modalService: NgbModal) { }

  ngOnInit(): void {
     this.id_history = this.route.snapshot.paramMap.get('id');
     this.getInfo();
    // this.covertUnixTime();
  }

  getInfo(): void{
    this.s.InfoHistory(this.id_history).subscribe((data: any) => {
      this.data_history = data;
      this.covertUnixTime(this.data_history.time);
    });
  }

  covertUnixTime(time ): void{
    const date = new Date( time * 1000 );
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    if ( day ===  1   ) {
      this.date_publication = this.Months[month] + ' ' + day + 'st, ' + year;
    } else if ( day === 2) {
      this.date_publication = this.Months[month] + ' ' + day + 'nd, ' + year;
    } else if ( day === 3) {
      this.date_publication = this.Months[month] + ' ' + day + 'rd, ' + year;
    } else {
      this.date_publication = this.Months[month] + ' ' + day + 'th, ' + year;
    }

  }

  ShowComent(content, kids): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getComents(kids);
  }

  getComents(kids): void{
    this.ids_comments = kids.slice(0, 20);
    this.ids_comments.forEach((id, index) => {
      this.s.InfoComents(id).subscribe( (data) => {
        this.arrayComments[index] = data;
      });
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
