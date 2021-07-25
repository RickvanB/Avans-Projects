package com.example.limited.Manager;

import android.app.Application;
import android.content.Context;

import com.example.limited.Model.FavoriteTravels;
import com.example.limited.Model.DepartureListItem;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class FavoriteManager {

    private Application application;
    private static final String TRAVEL_FAVORITE_FILE = "favorite_travels";

    public FavoriteManager(Application application){
        this.application = application;
    }

    /**
     * This method will save a list with departure items
     */
    private void saveTravels(FavoriteTravels travels){

        try
        {
            FileOutputStream fileStream = application.getApplicationContext().openFileOutput(TRAVEL_FAVORITE_FILE, Context.MODE_PRIVATE);
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileStream);
            objectOutputStream.writeObject(travels);
            objectOutputStream.close();
            fileStream.close();
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * This method will save a new favorite travel
     * @param travel travel to add
     */
    public boolean addTravel(DepartureListItem travel){
        FavoriteTravels favoriteTravels = getTravels();

        if(favoriteTravels.checkExisting(travel)){
            return false;
        }

        favoriteTravels.addTravel(travel);
        saveTravels(favoriteTravels);

        return true;
    }

    /**
     * This method will remove an existing favorite travel
     * @param travel travel to remove
     */
    public void removeTravel(DepartureListItem travel){
        FavoriteTravels favoriteTravels = getTravels();

        if(!favoriteTravels.checkExisting(travel)){
            return;
        }

        favoriteTravels.removeTravel(travel);
        saveTravels(favoriteTravels);
    }

    /**
     * This method will get a list with all favorite travels
     * @return item with list of all travels
     */
    public FavoriteTravels getTravels(){
        try{
            FileInputStream fileInput = application.getApplicationContext().openFileInput(TRAVEL_FAVORITE_FILE);
            ObjectInputStream objectInputStream = new ObjectInputStream(fileInput);
            FavoriteTravels favoriteTravels = (FavoriteTravels) objectInputStream.readObject();
            objectInputStream.close();
            fileInput.close();

            return favoriteTravels;

        } catch (Exception e){
            e.printStackTrace();
        }

        return new FavoriteTravels();
    }
}
