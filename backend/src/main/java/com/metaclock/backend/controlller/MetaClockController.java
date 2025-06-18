package com.metaclock.backend.controlller;

import com.metaclock.backend.core.MetaClock;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/clock")
public class MetaClockController {
    private final MetaClock metaClock;

    public MetaClockController(MetaClock metaClock) {
        this.metaClock = metaClock;
    }

    @GetMapping("/current-time")
    public Map<String, String> getCurrentTime() {
        var clock = metaClock.getClock();
        return Map.of(
                "hours", String.format("%02d", clock.getHours()),
                "minutes", String.format("%02d", clock.getMinutes()),
                "seconds", String.format("%02d", clock.getSeconds())
        );
    }

    @GetMapping("/current-angles")
    public Map<String, Float> getCurrentAngles() {
        var clock = metaClock.getClock();
        return Map.of(
                "hoursAngle", clock.getHoursAngleInRadians(),
                "minutesAngle", clock.getMinutesAngleInRadians(),
                "secondsAngle", clock.getSecondsAngleInRadians()
        );
    }
}
