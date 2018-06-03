import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CustomTextboxComponent } from './custom-textbox/custom-textbox.component';
import { SettingspageComponent } from './settingspage/settingspage.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTextboxComponent,SettingspageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [AppComponent, CustomTextboxComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}