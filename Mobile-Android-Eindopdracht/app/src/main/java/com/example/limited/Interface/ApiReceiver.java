package com.example.limited.Interface;

import com.example.limited.Model.DepartureListItem;

public interface ApiReceiver {

    void receiveContent(DepartureListItem item);

    void reportFailure(String message);
}
