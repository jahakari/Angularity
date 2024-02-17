import { Component, Input } from '@angular/core';

@Component({
    selector: 'badge',
    template: '<span [class]="badgeClass">{{ text }}</span>',
    standalone: true
})
export class BadgeComponent {
    @Input({ required: true }) theme!: string;
    @Input({ required: true }) text!: string;

    get badgeClass(): string { return `w-100 badge bg-${this.theme}` };
}
