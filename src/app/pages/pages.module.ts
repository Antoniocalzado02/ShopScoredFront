import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';
import { CartComponent } from './cart/cart.component';
import { pagesRoutingModule } from './pages-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddArticuloComponent } from './add-articulo/add-articulo.component';
import { EditArticuloComponent } from './edit-articulo/edit-articulo.component';
import { UpdateImageComponent } from './update-image/update-image.component';





@NgModule({
  declarations: [
    CategoryComponent,
    ArticleComponent,
    CartComponent,
    CategoryComponent,
    AddCategorieComponent,
    AddArticuloComponent,
    EditArticuloComponent,
    UpdateImageComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    pagesRoutingModule
  ]
})
export class PagesModule { }
