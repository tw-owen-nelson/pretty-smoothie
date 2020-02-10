package com.team68.PrettySmoothie.model;

import java.util.Hashtable;
import java.util.Map;
import java.util.Objects;

public class Recipe {
    private Map<String, String> ingredients;

    public Recipe(String... ingredients) {
        if (ingredients.length % 2 != 0) {
            throw new IllegalArgumentException("Even number of arguments required");
        }
        this.ingredients = new Hashtable<>();
        for (int i = 0; i < ingredients.length; i += 2) {
            this.ingredients.put(ingredients[i], ingredients[i + 1]);
        }
    }

    public Recipe(Map<String, String > ingredients) {
        this.ingredients = ingredients;
    }

    public Map<String, String> getIngredients() {
        return ingredients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return ingredients.equals(recipe.ingredients);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredients);
    }
}
