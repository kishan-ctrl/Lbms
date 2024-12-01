import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Correctly get the elements with type assertions
    const next = document.querySelector('.next') as HTMLElement | null;
    const prev = document.querySelector('.prev') as HTMLElement | null;

    // Initialize the active item on page load
    this.updateActiveItem();

    // Add event listeners only if the elements exist
    if (next) {
      next.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        const slide = document.querySelector('.slide');
        if (slide && items.length > 0) {
          slide.appendChild(items[0]);
          this.updateActiveItem(); 
        }
      });
    }

    if (prev) {
      prev.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        const slide = document.querySelector('.slide');
        if (slide && items.length > 0) {
          slide.prepend(items[items.length - 1]);
          this.updateActiveItem();  // Update the active item after moving to previous
        }
      });
    }
  }

  // Method to update the active item
  private updateActiveItem(): void {
    const items = document.querySelectorAll('.item');

    // Remove the active class from all items
    items.forEach(item => item.classList.remove('active'));

    // Set the second item (new center) as active
    if (items.length > 1) {
      items[1].classList.add('active');
    }

    // Update the visibility of the content
    items.forEach((item, index) => {
      const content = item.querySelector('.content') as HTMLElement | null;
      if (content) {
        content.style.display = index === 1 ? 'block' : 'none';
      }
    });
  }
}
