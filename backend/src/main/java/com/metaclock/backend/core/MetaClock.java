package com.metaclock.backend.core;

import com.metaclock.backend.core.numbers.ClockCoordinates;
import com.metaclock.backend.core.numbers.NumbersMapping3X2;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Timer;
import java.util.TimerTask;

@Component
public class MetaClock {
    private int ROW_COUNT = 3;
    private int COLUMN_COUNT = 8;

    @Autowired
    private NumbersMapping3X2 numbersMapping3X2;

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
                //System.out.println("Current time:");
                displayCurrentClockTime();
                displayCurrentAngleInRadians();
            }
        }, 0, 1000);
    }

    public ClockCoordinates[] getClockCoordinatesArray() {
        ClockCoordinates[] clockCoordinatesArray = new ClockCoordinates[COLUMN_COUNT * ROW_COUNT];

        for(int row = 0; row < 3; row++) {
            for(int col = 0; col < 2; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(0, row, col);
                clockCoordinatesArray[col * 2 + row] = clockCoordinates;
            }
            for(int col = 2; col < 4; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(1, row, col);
                clockCoordinatesArray[col * 2 + row] = clockCoordinates;
            }
            for(int col = 4; col < 6; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(2, row, col);
                clockCoordinatesArray[col * 2 + row] = clockCoordinates;
            }
            for(int col = 6; col < 8; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(3, row, col);
                clockCoordinatesArray[col * 2 + row] = clockCoordinates;
            }
        }

        return clockCoordinatesArray;
    }

    private void displayCurrentClockTime() {
        String hours = String.format("%02d", clock.getHours());
        String minutes = String.format("%02d", clock.getMinutes());
        String seconds = String.format("%02d", clock.getSeconds());

        //System.out.println(hours + ":" + minutes + ":" + seconds);
    }

    private void displayCurrentAngleInRadians() {
        //System.out.println("Hours in degrees: " + clock.getHourArrowDegrees());
        //System.out.println("Minutes in degrees: " + clock.getMinuteArrowDegrees());
        //System.out.println("Seconds in degrees: " + clock.getSecondArrowDegrees());
    }
}
