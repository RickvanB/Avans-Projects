package com.example.limited.API;

import android.annotation.SuppressLint;
import android.app.Application;
import android.content.res.Resources;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.limited.Fragment.DepartureFragment;
import com.example.limited.Fragment.DetailsHeaderFragment;
import com.example.limited.Fragment.DetailsProductDetailsFragment;
import com.example.limited.Interface.ApiReceiver;
import com.example.limited.Interface.DeparturesReceiver;
import com.example.limited.Model.DepartureListItem;
import com.example.limited.Model.Message;
import com.example.limited.Model.Station;
import com.example.limited.Model.Train;
import com.example.limited.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NS_Api extends AndroidViewModel {

    private List<DepartureListItem> departureList = new ArrayList<>();

    private String apiUrl = "https://gateway.apiportal.ns.nl";
    private final static String HEADER = "Ocp-Apim-Subscription-Key";
    private final static String API_KEY = "d46e1301fb6e48089ef2a3eeb4680915";

    public NS_Api(@NonNull Application application) {
        super(application);
    }

    public void GetAsyncRouteDetails(final ApiReceiver receiver, DepartureListItem item) {

        final DepartureListItem lItem = item;

        apiUrl = apiUrl + "/virtual-train-api/api/v1/trein/" + item.getNumber();
        RequestQueue queue = Volley.newRequestQueue(getApplication().getApplicationContext());
        JsonObjectRequest JsonObjectRequest = new JsonObjectRequest(Request.Method.GET, apiUrl, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Train train = formatTrainData(response);
                lItem.setPlannedTrain(train);
                receiver.receiveContent(lItem);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                boolean internetError = false;
                if (error instanceof NetworkError) {
                    internetError = true;
                } else if (error instanceof TimeoutError) {
                    internetError = true;
                }

                if(internetError) {
                    receiver.reportFailure("INTERNET");
                }
            }
        }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put(HEADER, API_KEY);
                return params;
            }
        };

        queue.add(JsonObjectRequest);
        queue.start();
    }

    public void GetAsyncDepartures(final DeparturesReceiver receiver, String stationShortCut) {

        // Safety check
        if(stationShortCut == null){
            return;
        }

        apiUrl = apiUrl + "/reisinformatie-api/api/v2/departures?station=" + stationShortCut;
        RequestQueue queue = Volley.newRequestQueue(getApplication().getApplicationContext());

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, apiUrl, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                receiver.receiveContent(formatDepartureData(response));
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                boolean internetError = false;
                if (error instanceof NetworkError) {
                    internetError = true;
                } else if (error instanceof TimeoutError) {
                    internetError = true;
                }

                if(internetError) {
                    receiver.reportFailure("INTERNET");
                }
            }
        }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put(HEADER, API_KEY);
                    return params;
            }
        };

        queue.add(jsonObjectRequest);
        queue.start();
    }

    private Train formatTrainData(JSONObject response) {
        Train train = null;
        try {

            JSONArray trainDetails = response.getJSONArray("materieeldelen");

            String materialCodes = "";
            ArrayList<String> partTypes = new ArrayList<>();

            for (int i = 0; i < trainDetails.length(); i++) {

                JSONObject trainDetail = trainDetails.getJSONObject(i);

                if(trainDetail.has("materieelnummer")){
                    if(i == trainDetails.length() -1){
                        materialCodes += trainDetail.getString("materieelnummer");

                    } else{
                        materialCodes += trainDetail.getString("materieelnummer") + ", ";
                    }

                }

                // Get specified type of train part
                if(trainDetail.has("type")){
                    partTypes.add(trainDetail.getString("type"));
                }

            }
                train = new Train(response.getString("type"),
                        response.getString("vervoerder"),
                        Integer.parseInt(response.getString("ritnummer")),
                        null,
                        Boolean.parseBoolean(response.getString("ingekort")),
                        Integer.parseInt(response.getString("lengte")),
                        null, materialCodes, partTypes);


        } catch(Exception e) {
            e.printStackTrace();
        }

        return train;
    }

    private List<DepartureListItem> formatDepartureData(JSONObject response) {
        try {
            JSONObject payload = null;
            JSONArray departureArray = null;

            try {
                payload = (JSONObject) response.getJSONObject("payload");
                departureArray = (JSONArray) payload.getJSONArray("departures"); // same for child2
            } catch (JSONException e) {
                e.printStackTrace();
            }

            if(departureArray != null){
                for (int i = 0; i < departureArray.length(); i++) {
                    List<Message> messageList = new ArrayList<>();

                    JSONObject departure = departureArray.getJSONObject(i);
                    JSONObject product = departure.getJSONObject("product");
                    if(departure.has("messages")) {
                        JSONArray messages = departure.getJSONArray("messages");

                        for (int j = 0; j < messages.length(); j++) {
                            JSONObject message = messages.getJSONObject(j);
                            messageList.add(new Message(message.getString("message"), message.getString("style")));
                        }
                    }

                    // Get stations
                    List<Station> subStations = new ArrayList<>();
                    if(departure.has("routeStations")){
                        JSONArray substations = departure.getJSONArray("routeStations");

                        for (int f = 0; f < substations.length(); f++) {
                            JSONObject subStation = substations.getJSONObject(f);
                            subStations.add(new Station(subStation.getString("uicCode"), subStation.getString("mediumName")));
                        }
                    }

                    String actualTrack = null;
                    if(departure.has("actualTrack")){
                        actualTrack = departure.getString("actualTrack");
                    }

                    String categoryCode = null;
                    if(departure.has("categoryCode")){
                        categoryCode = departure.getString("categoryCode");
                    }

                    departureList.add(new DepartureListItem(departure.getString("direction"), departure.getString("name"), returnTime(departure.getString("plannedDateTime")), returnTime(departure.getString("actualDateTime")), departure.getString("plannedTrack"),
                            null, product.getString("shortCategoryName"), Boolean.parseBoolean(departure.getString("cancelled")), subStations, departure.getString("departureStatus"), messageList, actualTrack, product.getString("number"), categoryCode));
                }
            }


        } catch(Exception e) {
            e.printStackTrace();
        }

        return departureList;
    }

    private String returnTime(String time) {
        String dateFormatted = null;
        Date parsed = new Date();
        Timestamp actTime = new Timestamp(00);
        @SuppressLint("SimpleDateFormat") SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        try {
            parsed = parser.parse(time);

            if(parsed != null){
                actTime = new Timestamp(parsed.getTime());
            }

            Date date = new Date(actTime.getTime());
            @SuppressLint("SimpleDateFormat") DateFormat formatter = new SimpleDateFormat("HH:mm");
            dateFormatted = formatter.format(date);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return dateFormatted;
    }
}