package com.team68.PrettySmoothie.controller;

import com.team68.PrettySmoothie.model.Fruit;
import org.junit.jupiter.api.Test;

import java.util.Collection;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;

public class FruitControllerTests {
    private FruitController fruitController = new FruitController();
    private Fruit banana = new Fruit("banana", "/media/banana.png", "#FDE8AE");
    private Fruit blueberry = new Fruit("blueberry", "/media/blueberry.png", "#5F3A81");
    private Fruit strawberry = new Fruit("strawberry", "/media/strawberry.png", "#E76F77");

    @Test
    void shouldReturnBasicFruits() {
        Collection<Fruit> fruits = fruitController.getFruits();
        assertThat(fruits, containsInAnyOrder(banana, blueberry, strawberry));
    }
}
