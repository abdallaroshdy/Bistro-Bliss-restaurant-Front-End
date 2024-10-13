import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule, NavComponent, FooterComponent],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  selectedDate: string = ''
  selectedTime: string = ''
  totalPersons = null

  messageType: string = ''
  alertMessage: string = ''

  showAlert: boolean = false

  http = inject(HttpClient)

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.http.get("http://localhost:3220/user/checkNormalUser", { withCredentials: true }).subscribe((data)=>{} , (err)=>{
      console.log(err);
      if(err.status === 401){
        this.router.navigate(['/login']);
        return;
      }
    })

    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
  }


  onSubmit()  {



    this.showAlert = false;

    if (!this.selectedDate || !this.selectedTime  ) {
      this.showAlertMessage('Please select both date and time.', 'danger');
      return;
    }else if(!this.totalPersons){
      this.showAlertMessage('Please Enter Total Persons', 'danger');
      return;
    }


    const dateTimeStr = `${this.selectedDate} ${this.selectedTime}`;
    const combinedDateTime = new Date(dateTimeStr);

    const now = new Date();

    if (combinedDateTime.getTime() < now.getTime()) {

      this.showAlertMessage('You have selected a past date/time. Please choose a future date/time.', 'danger')

    } else {

      // const formData = new FormData();
      const dateWithTimezone =  this.formatDateWithTimezone(combinedDateTime);

      const requestData = {
        date: dateWithTimezone,
        totalPersons: this.totalPersons
      }
      // formData.append('date', dateWithTimezone);
      // formData.append('totalPersons', this.totalPersons)

      console.log(dateWithTimezone);

      this.http.post("http://localhost:3220/bookATable/" ,  requestData , { withCredentials: true }).subscribe((data)=>{

        this.showAlertMessage('Table successfully booked!', 'success')

      },(err)=>{

        console.log(err);

        if(err.status === 401){

          this.router.navigate(['/login']);
          return;
        }else if(err.status === 400){

          this.showAlertMessage(err.error.data[0], 'danger');

        }
      })

    }
  }


  formatDateWithTimezone(date: Date): string {
    const offset = date.getTimezoneOffset(); // Get timezone offset in minutes
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const minutes = String(absOffset % 60).padStart(2, '0');
    const sign = offset > 0 ? '-' : '+';

    // Return formatted string with timezone offset
    return date.toISOString().replace('Z', `${sign}${hours}:${minutes}`);
  }


  showAlertMessage(message: string, type: string): void {
    this.alertMessage = message;
    this.messageType = type;
    this.showAlert = true;
  }
}
