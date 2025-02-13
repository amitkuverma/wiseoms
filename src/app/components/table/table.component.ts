import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  users = [
    { name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
    { name: 'Alice Johnson', email: 'alicej@example.com', role: 'Editor' }
  ];

  // Handle actions (like Edit or Delete)
  editUser(user: any) {
    console.log('Editing user', user);
  }

  deleteUser(user: any) {
    console.log('Deleting user', user);
  }
}
