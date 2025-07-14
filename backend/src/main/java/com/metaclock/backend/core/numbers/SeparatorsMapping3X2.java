package com.metaclock.backend.core.numbers;

public class SeparatorsMapping3X2 {
    private ClockCoordinates[][] map = {
            /*
                To the center
             */
            {
                    new ClockCoordinates(30, 330),
                    new ClockCoordinates(0, 180),
                    new ClockCoordinates(210, 150),
            },
            /*
                To the outward
             */
            {
                    new ClockCoordinates(210, 150),
                    new ClockCoordinates(180, 0),
                    new ClockCoordinates(30, 330),
            }
    };

    public ClockCoordinates getClockCoordinatesForSeparatorAndClock(boolean isToTheCenter, int clockY) {
        return map[isToTheCenter ? 0 : 1][clockY];
    }
}
