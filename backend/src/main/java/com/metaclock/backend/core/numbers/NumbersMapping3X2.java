package com.metaclock.backend.core.numbers;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

public class NumbersMapping3X2 {
    private ClockCoordinates[][] map = {
            /*
                0
             */
            {
                    new ClockCoordinates(90, 180),
                    new ClockCoordinates(180, 270),
                    new ClockCoordinates(0, 180),
                    new ClockCoordinates(180, 0),
                    new ClockCoordinates(0, 90),
                    new ClockCoordinates(270, 0)
            },
            /*
                1
             */
            {
                    null,
                    new ClockCoordinates(180, 180),
                    null,
                    new ClockCoordinates(180, 0),
                    null,
                    new ClockCoordinates(0, 0)
            },
            /*
                2
             */
            {
                    new ClockCoordinates(90, 90),
                    new ClockCoordinates(180, 270),
                    new ClockCoordinates(180, 90),
                    new ClockCoordinates(270, 0),
                    new ClockCoordinates(90, 0),
                    new ClockCoordinates(270, 270)
            },
    };

    public ClockCoordinates getClockCoordinatesForNumberAndClock(int number, int clockY, int clockX) {
        return map[number][clockY * 2 + clockX];
    }
}
