package com.metaclock.backend.controller;

import com.metaclock.backend.core.MetaClock;
import com.metaclock.backend.core.numbers.NumbersMapping3X2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/clock")
public class MetaClockController {
    @Autowired
    private MetaClock metaClock;

    @Autowired
    private NumbersMapping3X2 numbersMapping3X2;

    @GetMapping("/coordinates/3x2")
    public Map<String, Integer> get3X2ClockCoordinates(
            @RequestParam int number, @RequestParam int clockY, @RequestParam int clockX) {
        return Map.of(
                "minuteArrowDegrees", numbersMapping3X2.getClockCoordinatesForNumberAndClock(number, clockY, clockX).getMinuteArrowDegrees(),
                "hourArrowDegrees", numbersMapping3X2.getClockCoordinatesForNumberAndClock(number, clockY, clockX).getHourArrowDegrees()
        );
    }

//    @GetMapping("/current-time")
//    public Map<String, String> getCurrentTime() {
//        var clock = metaClock.getClock();
//        return Map.of(
//                "hours", String.format("%02d", clock.getHours()),
//                "minutes", String.format("%02d", clock.getMinutes()),
//                "seconds", String.format("%02d", clock.getSeconds())
//        );
//    }

    @GetMapping("/current-angles")
    public Map<String, Float> getCurrentAngles() {
        var clock = metaClock.getClock();
        return Map.of(
                "hoursArrowDegrees", clock.getHourArrowDegrees(),
                "minutesArrowDegrees", clock.getMinuteArrowDegrees(),
                "secondsArrowDegrees", clock.getSecondArrowDegrees()
        );
    }
}
