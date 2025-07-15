package com.metaclock.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clock")
@CrossOrigin(origins = "http://localhost:3000")
public class MetaClockController {

    @GetMapping("/timezones")
    public List<String> getTimezones() {
        return new ArrayList<>(ZoneId.getAvailableZoneIds())
                .stream()
                .sorted().
                collect(Collectors.toList());
    }
}
