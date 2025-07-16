package com.metaclock.backend.core;

import lombok.Getter;

import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Clock {
    @Getter
    private final ZoneId zoneId;

    public Clock(String timeZoneId) {
        this.zoneId = ZoneId.of(timeZoneId);
    }

    private LocalTime currentTime() {
        return ZonedDateTime.now(zoneId).toLocalTime();
    }

    public int getHours() {
        return currentTime().getHour();
    }

    public int getMinutes() {
        return currentTime().getMinute();
    }

    public int getSeconds() {
        return currentTime().getSecond();
    }
}
