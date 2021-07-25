package com.example.limited.Interface;

import com.example.limited.Model.DepartureListItem;

public interface DepartureListener {
    void updateDepartures(String stationShortCut);

    void onClickEvent(DepartureListItem item);
}
