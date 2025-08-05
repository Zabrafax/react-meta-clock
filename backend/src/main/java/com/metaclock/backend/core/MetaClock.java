package com.metaclock.backend.core;

import com.metaclock.backend.core.numbers.ClockCoordinates;
import com.metaclock.backend.core.numbers.NumbersMapping3X2;
import com.metaclock.backend.core.numbers.SeparatorsMapping3X2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MetaClock {
    private int[] numbers = new int[6];

    @Autowired
    private SeparatorsMapping3X2 separatorsMapping3X2;

    @Autowired
    private NumbersMapping3X2 numbersMapping3X2;

    public MetaClock() {}

    public ClockGridResponse getClockGridResponse(
            Clock clock,
            int rows,
            int cols,
            boolean isSecondsEnabled,
            boolean isSeparatorsEnabled,
            boolean isVertical
    ) {
        if (isVertical) {
            return getClockGridResponseVertical(clock, rows, cols, isSecondsEnabled);
        }

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

        updateNumbers(clock);

        ClockCoordinates[] clockCoordinatesArray = new ClockCoordinates[totalRows * totalCols];

        for(int row = 0; row < totalRows; row++) {
            int currentNumber = 0;
            for(int col = 0; col < totalCols;) {
                if(isSeparatorsEnabled && (col == 4 || col == 9)) {
                    boolean isToTheCenter = this.numbers[5] % 2 == 0;

                    ClockCoordinates clockCoordinates =
                            separatorsMapping3X2.getClockCoordinatesForSeparatorAndClock(isToTheCenter, row);
                    clockCoordinatesArray[row * totalCols + col] = clockCoordinates;

                    col++;
                } else {
                    for(int digitCol = 0; digitCol < 2; digitCol++) {
                        ClockCoordinates clockCoordinates =
                                numbersMapping3X2.getClockCoordinatesForNumberAndClock(this.numbers[currentNumber], row, digitCol);
                        clockCoordinatesArray[row * totalCols + (col + digitCol)] = clockCoordinates;
                    }

                    currentNumber++;
                    col += 2;
                }
            }
        }

        return new ClockGridResponse(totalRows, totalCols, clockCoordinatesArray);
    }

    private ClockGridResponse getClockGridResponseVertical(
            Clock clock,
            int rows,
            int cols,
            boolean isSecondsEnabled
    ) {
        int totalRows;
        int totalCols = cols * 2;
        int totalNumbers;

        if(isSecondsEnabled) {
            totalRows = rows * 3;
            totalNumbers = 6;
        }
        else {
            totalRows = rows * 2;
            totalNumbers = 4;
        }

        updateNumbers(clock);

        ClockCoordinates[] clockCoordinatesArray = new ClockCoordinates[totalRows * totalCols];

        int numberCol = 0;
        int numberRow = 0;

        for (int number = 0; number < totalNumbers; number++) {
            numberCol = (number % 2) * cols;
            numberRow = (number / 2) * rows;

            for (int digitRow = 0; digitRow < rows; digitRow++) {
                for (int digitCol = 0; digitCol < cols; digitCol++) {
                    ClockCoordinates clockCoordinates =
                            numbersMapping3X2.getClockCoordinatesForNumberAndClock(
                                    this.numbers[number],
                                    digitRow,
                                    digitCol
                            );
                    int targetRow = numberRow + digitRow;
                    int targetCol = numberCol + digitCol;
                    int index = targetRow * totalCols + targetCol;

                    clockCoordinatesArray[index] = clockCoordinates;
                }
            }
        }

        return new ClockGridResponse(totalRows, totalCols, clockCoordinatesArray);
    }

    private void updateNumbers(Clock clock) {
        this.numbers[0] = clock.getHours() / 10;
        this.numbers[1] = clock.getHours() % 10;
        this.numbers[2] = clock.getMinutes() / 10;
        this.numbers[3] = clock.getMinutes() % 10;
        this.numbers[4] = clock.getSeconds() / 10;
        this.numbers[5] = clock.getSeconds() % 10;
    }

    private void displayCurrentClockTime(Clock clock) {
        String hours = String.format("%02d", clock.getHours());
        String minutes = String.format("%02d", clock.getMinutes());
        String seconds = String.format("%02d", clock.getSeconds());

        //System.out.println(hours + ":" + minutes + ":" + seconds);
    }
}
