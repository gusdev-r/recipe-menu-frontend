import { AbstractType, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ], 
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {


  @Input() recipe:any
  @Input() toggle:any

  constructor(public dialog: MatDialog, private recipeService:RecipeServiceService) {
    console.log("toggle ", this.toggle)
  }

  handlerOpenEditRecipeForm() {
    this.dialog.open(UpdateRecipeFormComponent, {
      data:this.recipe
    })
  }
  ngOnInit() {
    console.log("toggle ", this.toggle)
  }
  handlerDeleteRecipe(id:any) {
    this.recipeService.deleteRecipe(this.recipe.id).subscribe()
  }
}

