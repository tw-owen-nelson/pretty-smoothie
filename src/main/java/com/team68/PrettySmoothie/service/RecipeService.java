package com.team68.PrettySmoothie.service;

import com.team68.PrettySmoothie.model.Recipe;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class RecipeService {
    public Collection<Recipe> getRecipes(String color) {
        Collection<Recipe> recipes = new ArrayList<>();
        switch (color) {
            case "FDE8AE":
                recipes.add(new Recipe("bananas", "8oz"));
                break;
            case "5F3A81":
                recipes.add(new Recipe("blueberries", "8oz"));
                break;
            case "E76F77":
                recipes.add(new Recipe("strawberries", "8oz"));
                break;
        }
        return recipes;
    }
}
