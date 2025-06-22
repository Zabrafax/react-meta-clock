package com.metaclock.backend.core.numbers;

import lombok.Getter;

public class ClockCoordinates {
    @Getter
    private int secondArrowDegrees;
    @Getter
    private int minuteArrowDegrees;
    @Getter
    private int hourArrowDegrees;

    public ClockCoordinates(int secondArrowDegrees, int minuteArrowDegrees, int hourArrowDegrees) {
        this.secondArrowDegrees = secondArrowDegrees;
        this.minuteArrowDegrees = minuteArrowDegrees;
        this.hourArrowDegrees = hourArrowDegrees;
    }

    public ClockCoordinates(int minuteArrowDegrees, int hourArrowDegrees) {
        this.minuteArrowDegrees = minuteArrowDegrees;
        this.hourArrowDegrees = hourArrowDegrees;
    }
}
