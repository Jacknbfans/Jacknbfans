//
//  ContentView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/4.
//

import SwiftUI

struct ContentView: View {
    let food = Food.examples
    @State private var selectedFood: Food?
  
    var body: some View {
        VStack(spacing: 30) {
            Group {
                if selectedFood != .none{
                    Text(selectedFood!.image)
                        .font(.system(size: 200))
                        .minimumScaleFactor(0.1)
                        .lineLimit(1)
                } else {
                    Image("dinner")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                }
            }.frame(height:250)
                .border(.red)
            
            Text("What are eating today?")
                .bold()
            
            if selectedFood != .none {
                Text(selectedFood!.name)
                    .font(.largeTitle)
                    .bold()
                    .foregroundColor(.green)
                    .id(selectedFood!.name)
                    .transition(.asymmetric(
                        insertion: .opacity.animation(.easeInOut(duration: 0.5).delay(0.2)),
                        removal: .opacity.animation(.easeInOut(duration: 0.4))))
            }

            Spacer()
            
            Button{
                selectedFood = food.shuffled().first {
                    $0 != selectedFood }
            } label: {
                Text(selectedFood == .none ? "tell me!" : "another").frame(width: 200)
                    .animation(.none, value: selectedFood)
                    .transformEffect(.identity)
            }.padding(.bottom, -15)
            
            Button{
                selectedFood = .none
            } label: {
                Text("Reset").frame(width: 200)
            }.buttonStyle(.bordered)
        }
        .padding()
        .frame(maxWidth: .infinity,maxHeight: .infinity)
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
