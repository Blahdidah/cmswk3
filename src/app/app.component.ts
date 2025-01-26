import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';

  loadedFeature = 'contact';

  onNavigate(loadedfeature: string) {
    console.log('feature switched to:', loadedfeature);
    this.loadedFeature = loadedfeature;
  }
}
