package com.team68.PrettySmoothie.model;

public class Fruit {
    private String name;
    private String imageURL;
    private String color;

    public Fruit(String name, String url, String color) {
        this.name = name;
        this.imageURL = url;
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getColor() {
        return color;
    }

    @Override
    public int hashCode() {
        return name.hashCode() + imageURL.hashCode() + color.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Fruit)) {
            return false;
        }
        Fruit otherFruit = (Fruit) obj;
        return this.name.equals(otherFruit.name)
                && this.imageURL.equals(otherFruit.imageURL)
                && this.color.equals(otherFruit.color);
    }
}
