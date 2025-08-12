
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loadLoginDetails() {
    const sso = {
      "auth": {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YTAxMjMxNS1mYjk0LTQyOGMtOGE2Zi00NTQ2ODNjNWIxZWUiLCJ1c2VybmFtZSI6InVzZXItYTBmNDBjNGM3NDA4NjA4NWNiOTQiLCJzaWQiOiI5ZGM5NDhjNi0wNGZhLTRhN2EtODhhMi1kYmUyM2IyYWE5OTkiLCJ0eXBlIjoiTk9STUFMIiwiaWF0IjoxNzU0NzkzNTk4fQ.KSCkimiXoiIDiN0ilvuVRAIanOOUdxEE__cUyDXFnrE",
        "user": {
          "country": {},
          "dob": {},
          "email": "demo2@addhuri.com",
          "username": "udemo2",
          "id": "eb4d734f-5c7e-430d-873f-4653add5de6d",
          "status": "ACTIVE",
          "type": "DEMO",
          "firstname": "Demo 2",
          "lastname": "User",
          "mobile": "",
          "gender": "UNKNOWN",
          "fullname": "Demo 2 User",
          "countryname": "NA (NA)",
          "dobstr": "Invalid Date"
        }
      }
    }
    localStorage.setItem('sso', JSON.stringify(sso));
  }
}
