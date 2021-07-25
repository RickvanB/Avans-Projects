//
//  SettingsViewController.swift
//  NSApp
//
//  Created by Rick on 24/03/2020.
//  Copyright © 2020 Rick van Beek. All rights reserved.
//

import Foundation
import UIKit

class SettingsViewController : UIViewController, UIPickerViewDelegate, UIPickerViewDataSource {

    // Label & textfield
    @IBOutlet weak var stationSelect: UIPickerView!
    @IBOutlet weak var textField: UITextField!
    
    // Variables
    var stations = ["Eindhoven Centraal", "Utrecht Centraal", "Amsterdam Centraal"]
    var selectedStation : String = ""
    var appTitle : String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.stationSelect.delegate = self
        self.stationSelect.dataSource = self
    }

    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    // Return amount of stations
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return stations.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return stations[row]
    }
    
    /**
        Save values based from user
     */
    @IBAction func save(_ sender: Any) {
        self.selectedStation = stations[stationSelect.selectedRow(inComponent: 0)]
        switch self.selectedStation {
            case "Eindhoven Centraal":
                self.selectedStation = "EHV"
            case "Utrecht Centraal":
                self.selectedStation = "UT"
            case "Amsterdam Centraal":
                self.selectedStation = "ASD"
            default:
                self.selectedStation = "UT"
        }
        
        UserDefaults().set(self.textField.text, forKey: "nl.rickvbeek.nsapp.title")
        UserDefaults().set(self.selectedStation, forKey: "nl.rickvbeek.nsapp.station")
        
        let alert = UIAlertController(title: "NS App", message: "Uw voorkeuren zijn opgeslagen!", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Okay", style: .default))
        self.present(alert, animated: true)
    }
    
    /**
        Remove overlay view
     */
    @IBAction func backClicked(_ sender: Any) {
        self.dismiss(animated: true)
    }
    
    /**
        Restore default values
     */
    @IBAction func resetSettings(_ sender: Any) {
        UserDefaults().removeObject(forKey: "nl.rickvbeek.nsapp.title")
        UserDefaults().removeObject(forKey: "nl.rickvbeek.nsapp.station")
        
        let alert = UIAlertController(title: "NS App", message: "Uw voorkeuren zijn gereset!", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Okay", style: .default))
        self.present(alert, animated: true)
    }
}
