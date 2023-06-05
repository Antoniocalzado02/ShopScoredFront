
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticuloComponent } from './add-articulo/add-articulo.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ArticleComponent } from './article/article.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { EditArticuloComponent } from './edit-articulo/edit-articulo.component';
import { UpdateImageComponent } from './update-image/update-image.component';


const routes: Routes = [
    {
        path: 'article',
        component: ArticleComponent,
        pathMatch: 'full'
    },
    {
        path: 'article/:id',
        component: ArticleComponent,
        pathMatch: 'full'
    },
    {
        path: 'cart',
        component: CartComponent,
        pathMatch: 'full'
    },
    {
        path: 'category',
        component: CategoryComponent,
        pathMatch: 'full'
    },
    {
        path: 'add',
        component: AddCategorieComponent,
        pathMatch: 'full'
    },
    {
        path: 'addArticle',
        component: AddArticuloComponent,
        pathMatch: 'full'
    },
    {
        path: 'editArticle/:id',
        component: EditArticuloComponent,
        pathMatch: 'full'
    },
    {
        path: 'updateImage/:username',
        component: UpdateImageComponent,
        pathMatch: 'full'
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class pagesRoutingModule { }