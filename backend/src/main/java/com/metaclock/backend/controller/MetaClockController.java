package com.metaclock.backend.controller;

import com.metaclock.backend.core.timezones.PopularTimeZones;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clock")
@CrossOrigin(origins = "http://localhost:3000")
public class MetaClockController {

    @GetMapping("/timezones")
    public List<Map<String, String>> getTimeZones() {
        return PopularTimeZones.getTIMEZONES().stream()
                .map(zone -> {
                    ZoneId zoneId = ZoneId.of(zone);
                    ZonedDateTime now = ZonedDateTime.now(zoneId);
                    String offset = now.getOffset().getId();
                    if ("Z".equals(offset)) offset = "+00:00";
                    String displayName = "(UTC" + offset + ") " + zone;

                    Map<String, String> entry = new HashMap<>();
                    entry.put("id", zone);
                    entry.put("label", displayName);
                    return entry;
                })
                .collect(Collectors.toList());
    }
}
