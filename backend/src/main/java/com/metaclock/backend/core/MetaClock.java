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
    private int number1;
    private int number2;
    private int number3;
    private int number4;
    private int number5;
    private int number6;

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

    public ClockCoordinates[] getClockCoordinatesArray(int rows, int cols) {
        updateNumbers();

        ClockCoordinates[] clockCoordinatesArray = new ClockCoordinates[rows * cols];

        for(int row = 0; row < rows; row++) {
            for(int col = 0; col < 2; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number1, row, col);
                clockCoordinatesArray[row * cols + col] = clockCoordinates;
            }
            for(int col = 2; col < 4; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number2, row, col - 2);
                clockCoordinatesArray[row * cols + col] = clockCoordinates;
            }
            for(int col = 4; col < 6; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number3, row, col - 4);
                clockCoordinatesArray[row * cols + col] = clockCoordinates;
            }
            for(int col = 6; col < 8; col++) {
                ClockCoordinates clockCoordinates =
                        numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number4, row, col - 6);
                clockCoordinatesArray[row * cols + col] = clockCoordinates;
            }

            /*
                In case of 3x12 grid
             */
            if(cols == 12) {
                for(int col = 8; col < 10; col++) {
                    ClockCoordinates clockCoordinates =
                            numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number5, row, col - 8);
                    clockCoordinatesArray[row * cols + col] = clockCoordinates;
                }
                for(int col = 10; col < 12; col++) {
                    ClockCoordinates clockCoordinates =
                            numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.number6, row, col - 10);
                    clockCoordinatesArray[row * cols + col] = clockCoordinates;
                }
            }
        }

        return clockCoordinatesArray;
    }

    private void updateNumbers() {
        this.number1 = clock.getHours() / 10;
        this.number2 = clock.getHours() % 10;
        this.number3 = clock.getMinutes() / 10;
        this.number4 = clock.getMinutes() % 10;
        this.number5 = clock.getSeconds() / 10;
        this.number6 = clock.getSeconds() % 10;
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
