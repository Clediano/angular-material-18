import { Component, inject, WritableSignal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { Theme, ThemeManagerService } from '../services/theme-manager.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class LayoutComponent {
  readonly rootRoutes = routes.filter((r) => r.path);
  private breakpointObserver = inject(BreakpointObserver);
  private themeManager = inject(ThemeManagerService);

  get theme(): WritableSignal<Theme> {
    return this.themeManager.theme;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  toggleTheme() {
    this.themeManager.toggleTheme();
  }
}
