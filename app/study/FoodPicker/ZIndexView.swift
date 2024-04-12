//
//  ZIndexView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/12.
//

import SwiftUI

struct ZIndexView: View {
    @State var shouldShow = ["leftTop": true, "leftBottom": true, "rightTop": true, "rightBottom": true]
    
    var body: some View {
        ZStack {
            buildTextView(text: "rightTop", position: .topLeading)
            buildTextView(text: "rightTop", position: .topTrailing)
            
            buildTextView(text: "leftBottom", position: .bottomLeading)
            buildTextView(text: "rightBottom", position: .bottomTrailing)
            
        }.animation(.easeInOut, value: shouldShow)
    }
    
    @ViewBuilder
    func buildTextView(text: String, position: Alignment) -> some View {
        RoundedRectangle(cornerRadius: 8)
            .fill(.teal.gradient)
            .frame(width:180, height: 140)
            .frame(maxWidth: .infinity, maxHeight: .infinity,alignment: position)
            .onTapGesture {
                shouldShow[text]!.toggle()
            }
        Text(text)
            .font(.largeTitle.bold()).foregroundColor(.white)
            .padding(50)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: position)
            .allowsHitTesting(false)
            .opacity(shouldShow[text]! ? 1 : 0)
    }
}
