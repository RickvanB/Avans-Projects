package com.example.limited.Interface;

import com.example.limited.Model.DepartureListItem;

import java.util.List;

public interface DeparturesReceiver {

    void receiveContent(List<DepartureListItem> items);

    void reportFailure(String message);
}
