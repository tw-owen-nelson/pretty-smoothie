package com.team68.PrettySmoothie.repository;

import com.team68.PrettySmoothie.model.Fruit;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;

@Repository
public class FruitRepository {
    private Collection<Fruit> fruits;

    public FruitRepository() {
        fruits = new ArrayList<>();
        fruits.add(new Fruit("banana", "/media/banana.png", "#FDE8AE"));
        fruits.add(new Fruit("blueberry", "/media/blueberry.png", "#5F3A81"));
        fruits.add(new Fruit("strawberry", "/media/strawberry.png", "#E76F77"));
        fruits.add(new Fruit("apple", "/media/apple.png", "#F4EEDA"));
        fruits.add(new Fruit("carrot", "/media/carrot.png", "#F38A2D"));
        fruits.add(new Fruit("mango", "/media/mango.png", "#FFBC39"));
        fruits.add(new Fruit("orange", "/media/orange.png", "#FF9F00"));
        fruits.add(new Fruit("pineapple", "/media/pineapple.png", "#FFE33B"));
    }

    public Collection<Fruit> getAllFruit() {
        return fruits;
    }
}
