package com.metaclock.backend.core;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Timer;
import java.util.TimerTask;

@Service
public class MetaClock {
    @Getter
    private Clock clock;

    public MetaClock() {
        this.clock = new Clock();
    }

    @PostConstruct
    public void getTimeEverySecond() {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println("Current time:");
                displayCurrentClockTime();
                displayCurrentAngleInRadians();
            }
        }, 0, 1000);
    }

    private void displayCurrentClockTime() {
        String hours = String.format("%02d", clock.getHours());
        String minutes = String.format("%02d", clock.getMinutes());
        String seconds = String.format("%02d", clock.getSeconds());

        System.out.println(hours + ":" + minutes + ":" + seconds);
    }

    private void displayCurrentAngleInRadians() {
        System.out.println("Hours in degrees: " + clock.getHourArrowDegrees());
        System.out.println("Minutes in degrees: " + clock.getMinuteArrowDegrees());
        System.out.println("Seconds in degrees: " + clock.getSecondArrowDegrees());
    }
}
