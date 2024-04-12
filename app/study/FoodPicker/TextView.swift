//
//  TextView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/12.
//

import SwiftUI

struct TextView: View {
    @State var selectedFood = Food.examples.first
    
    var body: some View {
        VStack(spacing: 30){
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
            
            Text("What are eating today?").bold()
            
            if selectedFood != .none {
                HStack{
                    Text(selectedFood!.name)
                        .font(.largeTitle)
                        .bold()
                        .foregroundColor(.green)
                        .id(selectedFood!.name)
                        .transition(.asymmetric(
                            insertion: .opacity.animation(.easeInOut(duration: 0.5).delay(0.2)),
                            removal: .opacity.animation(.easeInOut(duration: 0.4))))
                        Image(systemName: "info.circle.fill").foregroundColor(.secondary)
                }
                
                Text("Heat \(selectedFood!.$calorie)")
                
                HStack {
                    Text("Protein\n\(selectedFood!.$calorie)")
                        .fixedSize(horizontal: false, vertical: true)
                        .multilineTextAlignment(.center)
                        .lineSpacing(20)
                }
            }
            
            Spacer()
            
            Button{} label: {}.padding(.bottom, -15)
            
            Button {} label: {}.buttonStyle(.bordered)
        }
        .padding()
        .frame(maxWidth: .infinity, minHeight: .infinity)
        .background(.bg2)
        .font(.title)
        .buttonStyle(.borderedProminent)
        .buttonBorderShape(.capsule)
        .controlSize(.large)
        .animation(.easeInOut(duration: 0.6), value: selectedFood)
    }
}
