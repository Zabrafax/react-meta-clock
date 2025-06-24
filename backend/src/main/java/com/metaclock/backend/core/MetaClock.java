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

    private int number1;
    private int number2;
    private int number3;
    private int number4;

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
        updateNumbers();

        ClockCoordinates[] clockCoordinatesArray = new ClockCoordinates[COLUMN_COUNT * ROW_COUNT];

        for(int row = 0; row < 3; row++) {
            for(int col = 0; col < 2; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number1, row, col);
                clockCoordinatesArray[row * 8 + col] = clockCoordinates;
            }
            for(int col = 2; col < 4; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number2, row, col - 2);
                clockCoordinatesArray[row * 8 + col] = clockCoordinates;
            }
            for(int col = 4; col < 6; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number3, row, col - 4);
                clockCoordinatesArray[row * 8 + col] = clockCoordinates;
            }
            for(int col = 6; col < 8; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number4, row, col - 6);
                clockCoordinatesArray[row * 8 + col] = clockCoordinates;
            }
        }

        return clockCoordinatesArray;
    }

    private void updateNumbers() {
        this.number1 = clock.getHours() / 10;
        this.number2 = clock.getHours() % 10;
        this.number3 = clock.getMinutes() / 10;
        this.number4 = clock.getMinutes() % 10;
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
