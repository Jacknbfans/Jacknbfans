//
//  ShapeStyleView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/12.
//

import SwiftUI

struct ShapeStyleView: View {
    var body: some View {
        ZStack {
            Group {
                Circle().fill(.teal)
                Circle().fill(.teal.gradient)
                
                Circle().fill(.yellow)
            }
            Circle().fill(.image(.init("dinner"),scale:0.2))
                .zIndex(1)
            
            Text("Hello")
                .font(.system(size:100).bold())
                .foregroundStyle(.linearGradient(colors:[.pink,.indigo], startPoint: .topLeading, endPoint: .bottomTrailing))
                .background{ Color.bg2
                    .scaleEffect(x: 1.5, y: 1.3)
                    .blur(radius: 20)
                }
            
            Circle().fill(.teal)
            Circle().fill(.teal.gradient)
            Circle().fill(.teal)
            Circle().fill(.teal.gradient)
            Circle().fill(.teal)
            Circle().fill(.teal.gradient)
            }
    }
}

struct ShapeStyleView_Previews: PreviewProvider {
    static var previews: some View {
        ShapeStyleView()
    }
}
