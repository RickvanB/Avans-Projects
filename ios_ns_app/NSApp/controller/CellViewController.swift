//
//  CellViewController.swift
//  NSApp
//
//  Created by Rick on 26/03/2020.
//  Copyright © 2020 Rick van Beek. All rights reserved.
//

import Foundation
import UIKit

class CellViewController : UITableViewCell {
    
    // Variables
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var directionLabel: UILabel!
    @IBOutlet weak var trackLabel: UILabel!
    @IBOutlet weak var delayLabel: UILabel!
    @IBOutlet weak var cancelledLabel: UILabel!
    
    /**
        Setup cell view
     */
    func setCellView(departure : departures) {
        self.cancelledLabel.text = ""
        self.directionLabel.text = departure.direction
        self.delayLabel.text = ""
        self.trackLabel.text = departure.plannedTrack
        if(departure.actualTrack != nil) {
            self.trackLabel.text = departure.actualTrack
            self.trackLabel.textColor = UIColor.red
        }
        
        if(departure.cancelled) {
            self.cancelledLabel.text = "Geannuleerd: Ja"
            self.cancelledLabel.textColor = UIColor.red
        }
        
        if(departure.actualDateTime != "") {
            let delay = self.calculateDelay(planned: self.returnDate(dateString: departure.plannedDateTime)!, actual: self.returnDate(dateString: departure.actualDateTime)!)
            
            if(delay != 0) {
                self.delayLabel.text = "+" + String(delay)
                self.delayLabel.textColor = UIColor.red
            }
        }
        
        self.timeLabel.text = self.formatDate(dateString: departure.plannedDateTime)
    }
    
    /**
        Formats date to hour + minutes
     */
    func formatDate(dateString : String) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZZZZZ"
        
        let dateFormatterResult = DateFormatter()
        dateFormatterResult.dateFormat = "HH:mm"
        
        if let date = dateFormatter.date(from: dateString) {
            return dateFormatterResult.string(from: date)
        } else {
            return "Err"
        }
    }
    
    /**
        Returns date
     */
    func returnDate(dateString : String) -> Date? {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZZZZZ"
        return dateFormatter.date(from: dateString) ?? nil
    }
    
    /**
        Calculates the delay in minutes
     */
    func calculateDelay(planned : Date, actual : Date) -> Int {
        return Calendar.current.dateComponents([.minute], from: planned, to: actual).minute ?? 0
    }
}
