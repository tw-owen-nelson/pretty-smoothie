package com.team68.PrettySmoothie.model;

import java.util.Objects;

public class Color {
    private String name;

    public Color(String name, String color) {
        this.name = name;
        this.color = color;
    }

    private String color;

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Color color1 = (Color) o;
        return name.equals(color1.name) &&
                color.equals(color1.color);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, color);
    }
}
