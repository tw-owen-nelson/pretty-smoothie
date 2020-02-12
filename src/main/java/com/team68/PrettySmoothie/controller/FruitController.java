package com.team68.PrettySmoothie.controller;

import com.team68.PrettySmoothie.model.Color;
import com.team68.PrettySmoothie.model.Fruit;
import com.team68.PrettySmoothie.model.Recipe;
import com.team68.PrettySmoothie.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class FruitController {
    @Autowired
    private RecipeService recipeService;

    @GetMapping("/fruits")
    Collection<Fruit> getFruits() {
        Collection<Fruit> fruits = new ArrayList<>();
        fruits.add(new Fruit("banana", "/media/banana.png", "#FDE8AE"));
        fruits.add(new Fruit("blueberry", "/media/blueberry.png", "#5F3A81"));
        fruits.add(new Fruit("strawberry", "/media/strawberry.png", "#E76F77"));
        return fruits;
    }

    @GetMapping("/colors")
    Collection<Color> getColors() {
        Collection<Color> colors = new ArrayList<>();
        colors.add(new Color("yellow", "#FDE8AE"));
        colors.add(new Color("purple", "#5F3A81"));
        colors.add(new Color("pink", "#E76F77"));
        return colors;
    }

    @GetMapping("/recipes/{color}")
    Collection<Recipe> getRecipes(@PathVariable String color) {
        return recipeService.getRecipes(color);
    }
}
