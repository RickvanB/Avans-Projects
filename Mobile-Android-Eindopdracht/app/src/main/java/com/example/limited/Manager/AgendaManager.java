package com.example.limited.Manager;

import android.content.Intent;

import com.example.limited.Model.DepartureListItem;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class AgendaManager {

    /**
     * This method will create an agenda export item
     * @param departureListItem list of departures
     * @return Intent
     */
    public Intent createAgendaExport(DepartureListItem departureListItem){
        // Export departure to agenda
        Calendar cal = Calendar.getInstance();

        // Get correct date time
        int cur_month = cal.get(Calendar.MONTH) + 1;
        String string = cal.get(Calendar.DAY_OF_MONTH) +"-"+ cur_month +"-"+   cal.get(Calendar.YEAR) + " " + departureListItem.getActualDateTime();
        DateFormat format = new SimpleDateFormat("dd-MM-yyyy HH:mm", Locale.ENGLISH);

        try {
            Date date = format.parse(string);
            if (date != null) {
                cal.setTime(date);
            }

            Intent intent = new Intent(Intent.ACTION_EDIT);
            intent.setType("vnd.android.cursor.item/event");
            intent.putExtra("beginTime", cal.getTimeInMillis());
            intent.putExtra("allDay", false);
            intent.putExtra("endTime", cal.getTimeInMillis());
            intent.putExtra("title", departureListItem.getTrainCatagory() + " - " + departureListItem.getDirection());
            return intent;
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
