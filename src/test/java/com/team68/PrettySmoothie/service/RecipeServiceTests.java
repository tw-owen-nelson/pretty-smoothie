package com.team68.PrettySmoothie.service;

import com.team68.PrettySmoothie.model.Recipe;
import org.junit.jupiter.api.Test;

import java.util.Collection;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class RecipeServiceTests {
    private RecipeService recipeService = new RecipeService();
    private Recipe bananaRecipe = new Recipe("bananas", "8oz");

    @Test
    void shouldReturnRecipes() {
        Collection<Recipe> recipes = recipeService.getRecipes("FDE8AE");
        assertThat(recipes.toArray(new Recipe[0])[0], is(bananaRecipe));
    }
}
