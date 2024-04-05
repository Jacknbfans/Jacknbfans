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
                .bold()
            
            if selectedFood != .none {
                Text(selectedFood ?? "")
                    .font(.largeTitle)
                    .bold()
                    .foregroundColor(.green)
                    .id(selectedFood)
                    .transition(.asymmetric(
                        insertion: .opacity.animation(.easeInOut(duration: 0.5).delay(0.2)),
                        removal: .opacity.animation(.easeInOut(duration: 0.4))))
            }else{
                EmptyView()
            }
            
            selectedFood != .none ? Color.pink : Color.blue
            
            Button{
                withAnimation{
                    selectedFood = food.shuffled().filter {
                        $0 != selectedFood }.first
                }
            } label: {
                Text(selectedFood == .none ? "tell me!" : "another").frame(width: 200)
                    .animation(.none, value: selectedFood)
                    .transformEffect(.identity)
            }.padding(.bottom, -15)
            
            Button{
                withAnimation{
                    selectedFood = .none
                }
            } label: {
                Text("Reset").frame(width: 200)
            }.buttonStyle(.bordered)
        }
        .padding()
        .frame(maxHeight: .infinity)
        .background(Color(.secondarySystemBackground))
        .font(.title)
        .buttonStyle(.borderedProminent)
        .buttonBorderShape(.capsule)
        .controlSize(.large)
        .animation(.easeOut(duration: 0.6), value: selectedFood)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
