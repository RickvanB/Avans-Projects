package com.example.limited.Model;

import com.example.limited.Model.DepartureListItem;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class FavoriteTravels implements Serializable {

    private List<DepartureListItem> travels = new ArrayList<>();

    // Check if items is already in favorites
    public boolean checkExisting(DepartureListItem travel) {
        Integer result = this.getIndexOfTravel(travel);

        return result != null;
    }

    // Add new travel if not exists
    public void addTravel(DepartureListItem travel) {
        if(checkExisting(travel)){
            return;
        }

        travels.add(travel);
    }

    // Remove travel is exists
    public void removeTravel(DepartureListItem travel) {

        Integer index = getIndexOfTravel(travel);

        if(index == null){
            return;
        }

        travels.remove(index.intValue());
    }


    private Integer getIndexOfTravel(DepartureListItem travel) {

        for(int i = 0; i < getFavoriteTravels().size(); i++){
            // Return index if item is equal
            if(getFavoriteTravels().get(i).getName().equals(travel.getName())){
                return i;
            }
        }

        return null;
    }

    // Get collection. Changes are not allowed to prevent from mistakes with deleting
    public List<DepartureListItem> getFavoriteTravels() {
        return Collections.unmodifiableList(travels);
    }
}
