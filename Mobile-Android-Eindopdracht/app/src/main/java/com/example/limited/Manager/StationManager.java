package com.example.limited.Manager;

public class StationManager {

    /**
     * This method will return the correct stationshortcut
     * @param resource input
     * @return shortcut of station for api
     */
    public String getStationShortCut(String resource){
        String stationShortCut = null;

        switch (resource) {
            case "Utrecht Centraal":
                stationShortCut = "UT";
                break;
            case "Amersfoort Centraal":
                stationShortCut = "AMF";
                break;
            case "Eindhoven Centraal":
                stationShortCut = "EHV";
                break;
            case "\'s-Hertogenbosch":
                stationShortCut = "HT";
                break;
            case "Amsterdam Centraal":
                stationShortCut = "ASD";
                break;
            case "Maastricht":
                stationShortCut = "MT";
                break;
            case "Rosmalen":
                stationShortCut = "RS";
                break;
            case "Deventer":
                stationShortCut = "DV";
                break;
            case "Breda":
                stationShortCut = "BD";
                break;
            case "Arnhem Centraal":
                stationShortCut = "AH";
                break;
        }
        return stationShortCut;
    }
}
