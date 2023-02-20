import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { TopBarComponent } from './pages/top-bar/top-bar.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageModule } from './pages/homepage/homepage.module';
import { PreppingModule } from './pages/prepping/prepping.module';
import { CookingModule } from './pages/cooking/cooking.module';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        SocketIoModule.forRoot(socketIoConfig),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,

        HomepageModule,
        PreppingModule,
        CookingModule
    ]
})
export class AppModule { }
