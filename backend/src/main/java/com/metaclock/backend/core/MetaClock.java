package com.metaclock.backend.core;

import com.metaclock.backend.core.numbers.ClockCoordinates;
import com.metaclock.backend.core.numbers.NumbersMapping3X2;
import com.metaclock.backend.socket.ClockGridResponse;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Timer;
import java.util.TimerTask;

@Component
public class MetaClock {
    private int[] numbers = new int[6];

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

    public ClockGridResponse getClockGridResponse(int rows, int cols, boolean isSecondsEnabled, boolean isSeparatorsEnabled) {
        System.out.println("Earned parameters: " + rows + ", " + cols + ", " + isSecondsEnabled + ", " + isSeparatorsEnabled);

        int totalRows = rows;
        int totalCols;

        if(isSecondsEnabled) {
            totalCols = cols * 6;
        }
        else {
            totalCols = cols * 4;
        }

        if(isSeparatorsEnabled) {
            if(isSecondsEnabled) {
                totalCols += 2;
            } else {
                totalCols += 1;
            }
        }

        updateNumbers();

        ClockCoordinates[] clockCoordinatesArray = new ClockCoordinates[totalRows * totalCols];

        for(int row = 0; row < totalRows; row++) {
            int currentNumber = 0;
            for(int col = 0; col < totalCols; col += 2) {
                for(int digitCol = 0; digitCol < 2; digitCol++) {
                    ClockCoordinates clockCoordinates =
                            numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.numbers[currentNumber], row, digitCol);
                    clockCoordinatesArray[row * totalCols + (col + digitCol)] = clockCoordinates;
                }
                currentNumber++;
            }
        }

        return new ClockGridResponse(totalRows, totalCols, clockCoordinatesArray);
    }

    private void updateNumbers() {
        this.numbers[0] = clock.getHours() / 10;
        this.numbers[1] = clock.getHours() % 10;
        this.numbers[2] = clock.getMinutes() / 10;
        this.numbers[3] = clock.getMinutes() % 10;
        this.numbers[4] = clock.getSeconds() / 10;
        this.numbers[5] = clock.getSeconds() % 10;
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
