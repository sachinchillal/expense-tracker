import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-workspaces',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workspaces.component.html',
  styleUrl: './workspaces.component.scss'
})
export class WorkspacesComponent {
  constructor(public appService: AppService) { }

}
