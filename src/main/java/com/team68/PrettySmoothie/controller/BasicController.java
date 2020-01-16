package com.team68.PrettySmoothie.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicController {
    @RequestMapping("/")
    public String index() {
        return "Hello smoothie lover!";
    }
}
