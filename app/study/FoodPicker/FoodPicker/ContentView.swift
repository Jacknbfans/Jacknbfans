//
//  ContentView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/4.
//

import SwiftUI

struct ContentView: View {
    let food = ["Hamburger","salad","Pizza","spaghetti","ChickenBento","SlicedNoodles","hotPot","beefNoodles","KantoCooking"]
    @State private var selectedFood: String?
  
    var body: some View {
        VStack(spacing: 30) {
            Image("dinner")
                .resizable()
                .aspectRatio(contentMode: .fit)

            Text("What are eating today?")
                .font(.title)
                .bold()
            if selectedFood != .none {
                Text(selectedFood ?? "")
                    .font(.largeTitle)
                    .bold()
                    .foregroundColor(.green)
            }
            
            Button("tell me!"){
                selectedFood = food.shuffled().filter {
                    $0 != selectedFood }.first
            }
            .font(.title)
            .buttonStyle(.borderedProminent)
            
            Button("Reset"){
                selectedFood = .none
            }
            .font(.title)
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
