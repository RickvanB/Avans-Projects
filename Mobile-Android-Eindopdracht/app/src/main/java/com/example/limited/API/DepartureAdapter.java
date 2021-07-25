package com.example.limited.API;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.limited.Model.DepartureListItem;
import com.example.limited.Model.DepartureViewHolder;
import com.example.limited.R;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class DepartureAdapter extends RecyclerView.Adapter<DepartureViewHolder> {

    private List<DepartureListItem> departures;
    private View.OnClickListener onItemClickListener;
    private View.OnLongClickListener onLongItemClickListener;


    public void setDepartureList(List<DepartureListItem> departures) {
        this.departures = departures;
    }

    public List<DepartureListItem> getDepartureList() {
        return this.departures;
    }

    @NonNull
    @Override
    public DepartureViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = (View) LayoutInflater.from(parent.getContext()).inflate(R.layout.departure_list_item, parent, false);

        DepartureViewHolder viewHolder = new DepartureViewHolder(view);
        viewHolder.itemView.setOnClickListener(onItemClickListener);
        viewHolder.itemView.setOnLongClickListener(onLongItemClickListener);
        return viewHolder;
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull DepartureViewHolder holder, int position) {

        String totmessage = "";

        holder.getDepartionTime().setText(departures.get(position).getPlannendDateTime());
        if(!departures.get(position).getActualDateTime().equals(departures.get(position).getPlannendDateTime())) {
            @SuppressLint("SimpleDateFormat") SimpleDateFormat format = new SimpleDateFormat("HH:mm");
            try {
                Date date1 = format.parse(departures.get(position).getActualDateTime());
                Date date2 = format.parse(departures.get(position).getPlannendDateTime());
                long difference = 0;
                if(date1 != null && date2 !=null){
                    difference = date1.getTime() - date2.getTime();
                }


                Date date = new Date(difference);
                @SuppressLint("SimpleDateFormat") DateFormat formatter = new SimpleDateFormat("m");
                String dateFormatted = formatter.format(date);
                holder.getDelay().setText( "+" + dateFormatted );
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        holder.getDirection().setText(departures.get(position).getDirection());

        // Set correct message --> If present show messages. If not present show route stations
        if (departures.get(position).getMessages() != null) {
            if (departures.get(position).getMessages().size() > 0) {
                String totMessage = "";
                // Set default style
                holder.setMessageStyle("INFO");
                for (int i = 0; i < departures.get(position).getMessages().size(); i++) {
                    if(i == departures.get(i).getMessages().size() -1){
                        totMessage += departures.get(position).getMessages().get(i).getMessage();
                    } else {
                        totMessage += departures.get(position).getMessages().get(i).getMessage() + "\n";
                    }

                    if(departures.get(position).getMessages().get(i).getType() == "WARNING"){
                        holder.setMessageStyle(departures.get(position).getMessages().get(i).getType());
                    }
                }
                totmessage += totMessage;
            }
        }
        // Set correct message --> If present show messages. If not present show route stations
        if (departures.get(position).getMessages() == null || departures.get(position).getMessages().size() == 0) {
            if (departures.get(position).getRouteStations() != null) {
                if (departures.get(position).getRouteStations().size() > 0) {
                    String totMessage = "Via ";
                    for (int i = 0; i < departures.get(position).getRouteStations().size(); i++) {
                        if(i == (departures.get(position).getRouteStations().size() -1)){
                            totMessage += departures.get(position).getRouteStations().get(i).getMediumName();
                        } else{
                            totMessage += departures.get(position).getRouteStations().get(i).getMediumName() + ", ";
                        }

                    }
                    totmessage += totMessage;
                }
            }
        }

        // Add type of train to message string. So IC or SPR
        holder.getMessage().setText(departures.get(position).getTrainCatagory() + "\n" + totmessage);

        // Set correct departure track
        if(departures.get(position).getActualTrack() != null){
            holder.getPlannendTrack().setText(departures.get(position).getActualTrack());
            holder.setTrackChanged(true);
        } else{
            holder.getPlannendTrack().setText(departures.get(position).getPlannendTrack());
        }

        holder.setCanceled(departures.get(position).isCanceld());
        holder.SetCorrectStyle();
    }

    @Override
    public int getItemCount() {
        if(departures == null) {
            return 0;
        }

        return departures.size();
    }

    public DepartureListItem getItem(int position){
        return departures.get(position);
    }

    public void setOnItemClickListener(View.OnClickListener clickListener){
        onItemClickListener = clickListener;
    }

    public void setOnLongItemClickListener(View.OnLongClickListener clickListener){
        onLongItemClickListener = clickListener;
    }
}
