package com.team68.PrettySmoothie.controller;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;

import org.junit.jupiter.api.Test;

import java.util.Collection;
import com.team68.PrettySmoothie.model.Fruit;

public class FruitControllerTests {
    private FruitController fruitController = new FruitController();
    private Fruit banana = new Fruit("banana", "/media/banana.png", "#FDE8AE");
    private Fruit blueberry = new Fruit("blueberry", "/media/blueberry.png", "#291420");
    private Fruit strawberry = new Fruit("strawberry", "/media/strawberry.png", "#B60000");

    @Test
    void shouldReturnBasicFruits() {
        Collection<Fruit> fruits = fruitController.getFruits();
        assertThat(fruits, containsInAnyOrder(banana, blueberry, strawberry));
    }
}
