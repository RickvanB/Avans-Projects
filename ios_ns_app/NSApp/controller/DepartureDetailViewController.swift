//
//  DepartureDetailViewController.swift
//  NSApp
//
//  Created by Rick on 21/03/2020.
//  Copyright © 2020 Rick van Beek. All rights reserved.
//

import Foundation
import UIKit

class DepartureDetailViewController: UIViewController {
    
    // Variables
    var product: String?
    var train : Train? {
        didSet {
            DispatchQueue.main.async {
                self.setupView()
            }
        }
    }
    
    // Labels
    @IBOutlet weak var typeLabel: UILabel!
    @IBOutlet weak var carrierLabel: UILabel!
    @IBOutlet weak var rideNumber: UILabel!
    @IBOutlet weak var lengthMeters: UILabel!
    @IBOutlet weak var parts: UILabel!
    @IBOutlet weak var imageView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.retrieveTrain()
    }
    
    /**
            Retreive a single train with information
     */
    func retrieveTrain() {
        DepartureRepository().getDepartureDetail(number: (product)!) { [weak self] result in
            switch result {
            case .success(let list): do {
                self?.train = list
            } case .failure(let error):
                print(error)
            }
        }
    }
    
    /**
            Setups the view
     */
    func setupView() {
        self.typeLabel.text = self.train?.type
        self.carrierLabel.text = self.train?.vervoerder
        self.rideNumber.text = "\(self.train?.ritnummer ?? 0)"
        self.lengthMeters.text = "\(self.train?.lengteInMeters ?? 0)"
        self.parts.text = "\(self.train?.lengte ?? 0)"
        
        let urlImage = self.train?.materieeldelen?[0].afbeelding ?? ""
        let url = URL(string: urlImage)

        if urlImage != "" {
            DispatchQueue.global().async {
                let data = try? Data(contentsOf: url!)
                DispatchQueue.main.async {
                    self.imageView.image = UIImage(data: data!)
                }
            }
        }
    }
}
