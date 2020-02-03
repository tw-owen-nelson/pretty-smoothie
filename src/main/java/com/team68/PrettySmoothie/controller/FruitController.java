package com.team68.PrettySmoothie.controller;

import com.team68.PrettySmoothie.model.Fruit;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class FruitController {
    @GetMapping("/fruits")
    Collection<Fruit> getFruits() {
        Collection<Fruit> fruits = new ArrayList<>();
        fruits.add(new Fruit("banana", "/media/banana.png", "#FDE8AE"));
        fruits.add(new Fruit("blueberry", "/media/blueberry.png", "#291420"));
        fruits.add(new Fruit("strawberry", "/media/strawberry.png", "#B60000"));
        return fruits;
    }
}
