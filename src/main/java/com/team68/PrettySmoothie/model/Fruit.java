package com.team68.PrettySmoothie.model;

public class Fruit {
    private String name;
    private String imageURL;

    public Fruit(String name, String url) {
        this.name = name;
        this.imageURL = url;
    }

    public String getName() {
        return name;
    }

    public String getImageURL() {
        return imageURL;
    }

    @Override
    public int hashCode() {
        return name.hashCode() + imageURL.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Fruit)) {
            return false;
        }
        Fruit otherFruit = (Fruit) obj;
        return this.name.equals(otherFruit.name) && this.imageURL.equals(otherFruit.imageURL);
    }
}
