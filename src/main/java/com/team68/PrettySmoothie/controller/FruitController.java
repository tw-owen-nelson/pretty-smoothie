package com.team68.PrettySmoothie.controller;

import com.team68.PrettySmoothie.model.Color;
import com.team68.PrettySmoothie.model.Fruit;
import com.team68.PrettySmoothie.model.Recipe;
import com.team68.PrettySmoothie.repository.FruitRepository;
import com.team68.PrettySmoothie.service.RecipeService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class FruitController {
    private RecipeService recipeService;
    private FruitRepository fruitRepository;

    public FruitController(FruitRepository fruitRepository, RecipeService recipeService) {
        this.fruitRepository = fruitRepository;
        this.recipeService = recipeService;
    }

    @GetMapping("/fruits")
    Collection<Fruit> getFruits() {
        return fruitRepository.getAllFruit();
    }

    @GetMapping("/colors")
    Collection<Color> getColors() {
        Collection<Color> colors = new ArrayList<>();
        colors.add(new Color("yummy yellow", "#FDE8AE"));
        colors.add(new Color("pleasing purple", "#5F3A81"));
        colors.add(new Color("pretty pink", "#E76F77"));
        return colors;
    }

    @GetMapping("/recipes/{color}")
    Collection<Recipe> getRecipes(@PathVariable String color) {
        return recipeService.getRecipes(color);
    }
}
