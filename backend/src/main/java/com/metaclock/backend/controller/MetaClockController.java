package com.metaclock.backend.controller;

import com.metaclock.backend.core.timezones.PopularTimeZones;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;
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
                    ZoneOffset zoneOffset = now.getOffset();
                    String offset = zoneOffset.getId();
                    int offsetSeconds = zoneOffset.getTotalSeconds();

                    if ("Z".equals(offset)) offset = "+00:00";
                    String zoneString = zone.replace('_', ' ');
                    String displayName = "(UTC" + offset + ") " + zoneString;

                    Map<String, String> entry = new HashMap<>();
                    entry.put("id", zone);
                    entry.put("label", displayName);
                    entry.put("offset", offset);
                    entry.put("offsetSeconds", String.valueOf(offsetSeconds));
                    return entry;
                })
                .sorted(Comparator.comparingInt(e -> Integer.parseInt(e.get("offsetSeconds"))))
                .collect(Collectors.toList());
    }
}
