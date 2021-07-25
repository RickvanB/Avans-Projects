package com.example.limited.Model;

import java.io.Serializable;
import java.util.List;

public class Station  implements Serializable {

    private String uicCode;

    private String mediumName;

    public Station(String uicCode, String mediumName) {
        this.uicCode = uicCode;
        this.mediumName = mediumName;
    }

    public String getUicCode() {
        return uicCode;
    }

    public String getMediumName() {
        return mediumName;
    }
}
