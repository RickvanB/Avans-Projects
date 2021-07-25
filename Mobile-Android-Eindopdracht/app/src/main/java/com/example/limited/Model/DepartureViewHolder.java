package com.example.limited.Model;

import android.graphics.Color;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.limited.R;

public class DepartureViewHolder extends RecyclerView.ViewHolder {


    private TextView departionTime;
    private TextView direction;
    private TextView delay;
    private TextView plannendTrack;
    private TextView message;
    private boolean canceled;
    private String messageStyle;
    private boolean trackChanged;

    public DepartureViewHolder(@NonNull View itemView) {
        super(itemView);

        departionTime = (TextView) itemView.findViewById(R.id.departure_time);
        direction = (TextView) itemView.findViewById(R.id.direction);
        delay = (TextView) itemView.findViewById(R.id.delay);
        plannendTrack = (TextView) itemView.findViewById(R.id.planned_track);
        message = (TextView) itemView.findViewById(R.id.message);

        itemView.setTag(this);
    }

    public TextView getDepartionTime() {
        return departionTime;
    }

    public TextView getDirection() {
        return direction;
    }

    public TextView getDelay() {
        return delay;
    }

    public TextView getPlannendTrack() {
        return plannendTrack;
    }

    public TextView getMessage() {
        return message;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
    }

    public void setMessageStyle(String messageStyle) {
        this.messageStyle = messageStyle;
    }

    public void setTrackChanged(boolean trackChanged) {
        this.trackChanged = trackChanged;
    }

    public void SetCorrectStyle(){
        // Default styling
        this.message.setTextColor(Color.parseColor("#8d8aa7"));
        this.departionTime.setTextColor(Color.parseColor("#354c7b"));
        this.direction.setTextColor(Color.parseColor("#354c7b"));
        this.plannendTrack.setTextColor(Color.parseColor("#354c7b"));

        // Change style to canceled
        if(this.canceled){
            this.departionTime.setTextColor(Color.parseColor("#b3b3b3"));
            this.direction.setTextColor(Color.parseColor("#b3b3b3"));
            this.plannendTrack.setTextColor(Color.parseColor("#b3b3b3"));
            this.message.setTextColor(Color.parseColor("#ff4d4d"));
        }

        // Set message Style
        if(this.message != null && this.messageStyle != null) {
            if ("WARNING".equals(this.messageStyle)) {
                this.message.setTextColor(Color.parseColor("#ff4d4d"));
            } else {
                this.message.setTextColor(Color.parseColor("#8d8aa7"));
            }
        }
        // Change color of track view
        if(this.trackChanged){
            this.plannendTrack.setTextColor(Color.parseColor("#ff4d4d"));
        }
    }
}
