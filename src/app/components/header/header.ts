import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.html',
})
export class Header {}
