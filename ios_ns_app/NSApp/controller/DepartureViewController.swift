//
//  DepartureViewController.swift
//  NSApp
//
//  Created by Rick on 21/03/2020.
//  Copyright © 2020 Rick van Beek. All rights reserved.
//

import Foundation
import UIKit

class DepartureViewController : UITableViewController {
    
    // Labels
    @IBOutlet weak var SettingsButton: UIBarButtonItem!
    @IBOutlet weak var titleLabel: UILabel!
    
    // Variables
    var departures : TrainDeparture? {
        didSet {
            DispatchQueue.main.async {
                self.tableView.reloadData()
                self.refreshControl?.endRefreshing()
            }
        }
    }
    
    override func viewDidLoad() {
        self.retrieveDepartures()
        self.setTitleApp()
    }
    
    override func tableView(_ tableView : UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.departures?.payload?.departures.count ?? 0
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "DepartureCell", for: indexPath) as! CellViewController
        guard let departure = self.departures?.payload?.departures[indexPath.row] else { return cell }
        cell.setCellView(departure: departure)
        
        return cell
    }
    
    /**
            Show detail page when clicked on row
     */
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let departureDetailController = segue.destination as? DepartureDetailViewController {
            let departure = self.departures?.payload?.departures[self.tableView.indexPathForSelectedRow!.row]
            departureDetailController.product = departure?.product?.number
        }
    }
    
    /**
        Retrieve departures from station
     */
    func retrieveDepartures() -> Void {
        DepartureRepository().getDepartures { [weak self] result in
            switch result {
                case .success(let list): do {
                        self?.departures = list
                    }
                case .failure(let error):
                    print(error)
                }
            }
    }
    
    /**
        Show settings page when clicked on button
     */
    @IBAction func toSettingsPage(sender: AnyObject) {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let vc = storyboard.instantiateViewController(withIdentifier: "settingsscreen")
        self.present(vc, animated: true, completion: nil)
    }
    
    /**
        Set title based on the user settings
     */
    func setTitleApp() {
        var appTitle = UserDefaults.standard.string(forKey: "nl.rickvbeek.nsapp.title")
        if appTitle == nil {
            appTitle = "NS App"
        }
        
        self.titleLabel.text = appTitle
    }
}
