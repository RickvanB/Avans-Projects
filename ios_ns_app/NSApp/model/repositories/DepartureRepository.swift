//
//  DepartureRepository.swift
//  nsApp
//
//  Created by Rick van Beek on 10/03/2020.
//  Copyright © 2020 Rick van Beek. All rights reserved.
//

import Foundation

class DepartureRepository {
    
    var base_url = "https://gateway.apiportal.ns.nl"
    var api_key = "d46e1301fb6e48089ef2a3eeb4680915"
    var header_field = "Ocp-Apim-Subscription-Key"
    
    enum trainError:Error {
        case noDataAvailable
        case canNotProcessData
    }
    
    /**
        Retrieves departures based on the station
     */
    func getDepartures(_ completion: @escaping(Result<TrainDeparture?, trainError>) -> Void) {
        
        let station = UserDefaults.standard.string(forKey: "nl.rickvbeek.nsapp.station")
        let session = URLSession.shared
        let requestUrl = "\(self.base_url)/reisinformatie-api/api/v2/departures?station=\(station ?? "UT")"
        var departures : TrainDeparture?
        
        if let url = URL(string: requestUrl) {
            var request = URLRequest(url: url)
            request.setValue(self.api_key, forHTTPHeaderField: self.header_field)
        
            session.dataTask(with: request, completionHandler: { data, res, err in
                if let data = data {
                    do {
                        let decoder = JSONDecoder()
                        departures = try decoder.decode(TrainDeparture.self, from: data)
                        completion(.success(departures))
                    } catch {
                        completion(.failure(.canNotProcessData))
                    }
                }
            }).resume()
        }
    }
    
    /**
        Retrieves a train detail
     */
    func getDepartureDetail(number : String,_ completion: @escaping(Result<Train?, trainError>) -> Void) {
        
        let session = URLSession.shared
        let requestUrl = "\(base_url)/virtual-train-api/api/v1/trein/\(number)"
        var train : Train?
        
        if let url = URL(string: requestUrl) {
            var request = URLRequest(url: url)
            request.setValue(self.api_key, forHTTPHeaderField: self.header_field)
            
                session.dataTask(with: request, completionHandler: { data, res, err in
                    if let data = data {
                        do {
                            let decoder = JSONDecoder()
                            train = try decoder.decode(Train.self, from: data)
                            completion(.success(train))
                        } catch {
                            completion(.failure(.canNotProcessData))
                        }
                    }
                }).resume()
        }
        
    }
}
