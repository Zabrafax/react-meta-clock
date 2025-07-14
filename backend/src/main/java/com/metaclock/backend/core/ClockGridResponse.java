package com.metaclock.backend.core;

import com.metaclock.backend.core.numbers.ClockCoordinates;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class ClockGridResponse {
    @Getter
    private int gridRows;
    @Getter
    private int gridCols;
    @Getter
    private ClockCoordinates[] clockCoordinates;
}
