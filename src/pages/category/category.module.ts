import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryOverviewPage } from './category-overview';

@NgModule({
  declarations: [
    CategoryOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryOverviewPage),
  ],
})
export class CategoryOverviewPageModule {}
