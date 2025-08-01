package com.metaclock.backend.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class UserTheme {
    private int currentThemeNumber;

    private String firstThemeColor;
    private String accentThemeColor;
    private String textThemeColor;
    private boolean arrowShadow;
}
