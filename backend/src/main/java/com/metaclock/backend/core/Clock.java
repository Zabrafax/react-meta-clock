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
    @Getter
    private int hours;
    @Setter
    @Getter
    private int minutes;
    @Setter
    @Getter
    private int seconds;

    @Getter
    @Setter
    private float hoursAngleInRadians;
    @Getter
    @Setter
    private float minutesAngleInRadians;
    @Getter
    @Setter
    private float secondsAngleInRadians;

    public Clock() {
        this.isManual = false;

        startAutoUpdate();
    }

    private void updateToCurrentTime() {
        LocalTime currentTime = LocalTime.now();
        this.hours = currentTime.getHour();
        this.minutes = currentTime.getMinute();
        this.seconds = currentTime.getSecond();
    }

    private void countAnglesInRadians() {
        int AMPMHours = this.hours > 12 ? this.hours - 12 : this.hours;

        this.hoursAngleInRadians = (float) (AMPMHours * 30) +
                (float) (this.minutes * 0.5) +
                (float) (this.seconds * (0.5 / 60));

        this.minutesAngleInRadians = (float) (this.minutes * 6)+ (float) (this.seconds * 0.1);

        this.secondsAngleInRadians = (float) (this.seconds * 6);
    }

    private void startAutoUpdate() {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                updateToCurrentTime();
                countAnglesInRadians();
            }
        }, 0, 1000);
    }
}
