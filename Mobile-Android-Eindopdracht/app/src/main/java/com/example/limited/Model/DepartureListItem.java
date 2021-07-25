package com.example.limited.Model;

import java.io.Serializable;
import java.util.List;

public class DepartureListItem implements Serializable {

    private String direction;
    private String name;
    private String plannenDateTime;
    private String actualDateTime;
    private String plannedTrack;
    private String actualTrack;
    private Train plannedTrain;
    private String trainCatagory;
    private boolean canceld;
    private List<Station> routeStations;
    private String departureStatus;
    private List<Message> messages;
    private String number;
    private String short_train_type;

    public DepartureListItem(String direction, String name, String plannedDateTime, String actualDateTime, String plannedTrack, Train plannedTrain, String trainCatagory, boolean canceld, List<Station> routeStations, String departureStatus, List<Message> messages, String actualTrack, String number,
                             String short_train_type ) {
        this.direction = direction;
        this.name = name;
        this.plannenDateTime = plannedDateTime;
        this.actualDateTime = actualDateTime;
        this.plannedTrack = plannedTrack;
        this.plannedTrain = plannedTrain;
        this.trainCatagory = trainCatagory;
        this.canceld = canceld;
        this.routeStations = routeStations;
        this.departureStatus = departureStatus;
        this.messages = messages;
        this.actualTrack = actualTrack;
        this.number = number;
        this.short_train_type = short_train_type;
    }

    public Train getPlannedTrain() {

        return plannedTrain;
    }


    public String getDirection() {
        return direction;
    }

    public String getName() {
        return name;
    }

    public String getPlannendDateTime() {
        return plannenDateTime;
    }

    public String getActualDateTime() {
        return actualDateTime;
    }

    public String getPlannendTrack() {
        return plannedTrack;
    }

    public String getShort_train_type() { return short_train_type; }

    public String getTrainCatagory() {
        return trainCatagory;
    }

    public boolean isCanceld() {
        return canceld;
    }

    public List<Station> getRouteStations() {
        return routeStations;
    }

    public String getActualTrack() {
        return actualTrack;
    }

    public String getDepartureStatus() {
        return departureStatus;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public String getNumber() { return number; }

    public void setPlannedTrain(Train train) {
        this.plannedTrain = train;
    }



}
