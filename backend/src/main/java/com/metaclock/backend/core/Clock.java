package com.metaclock.backend.core;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Timer;
import java.util.TimerTask;

public class Clock {
    @Getter
    private boolean isManual;
    @Setter
    private int hours;
    @Setter
    private int minutes;
    @Setter
    private int seconds;

    @Setter
    private float hourArrowDegrees;
    @Setter
    private float minuteArrowDegrees;
    @Setter
    private float secondArrowDegrees;

    public Clock() {
        this.isManual = false;
    }

    private void updateToCurrentTime() {
        LocalTime currentTime = LocalTime.now();
        this.hours = currentTime.getHour();
        this.minutes = currentTime.getMinute();
        this.seconds = currentTime.getSecond();
    }

    private void countAnglesInDegrees() {
        int AMPMHours = this.hours > 12 ? this.hours - 12 : this.hours;

        this.hourArrowDegrees = (float) (AMPMHours * 30) +
                (float) (this.minutes * 0.5) +
                (float) (this.seconds * (0.5 / 60));

        this.minuteArrowDegrees = (float) (this.minutes * 6)+ (float) (this.seconds * 0.1);

        this.secondArrowDegrees = (float) (this.seconds * 6);
    }

    public float getSecondArrowDegrees() {
        updateToCurrentTime();
        countAnglesInDegrees();
        return this.secondArrowDegrees;
    }

    public float getMinuteArrowDegrees() {
        updateToCurrentTime();
        countAnglesInDegrees();
        return this.minuteArrowDegrees;
    }

    public float getHourArrowDegrees() {
        updateToCurrentTime();
        countAnglesInDegrees();
        return this.hourArrowDegrees;
    }

    public int getSeconds() {
        updateToCurrentTime();
        return this.seconds;
    }

    public int getMinutes() {
        updateToCurrentTime();
        return this.minutes;
    }

    public int getHours() {
        updateToCurrentTime();
        return this.hours;
    }
}
