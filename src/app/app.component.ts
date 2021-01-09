import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng2-stompjs-angular7';

  constructor() {
    // Uncomment following line to break e2e test,
    // since it will wait forever for this interval to finish

    // interval(500).subscribe();
  }
}
