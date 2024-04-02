//
//  Constant.swift
//  kevin005
//
//  Created by 侯羽 on 2024/3/26.
//

import Foundation

typealias Experience = (title: String, company: String, start: String, end: String)

struct Resume {
    static let shared = Resume()
    let name     = "Kevin Hou"
    let title    = "swift developer"
    let location = "location:tokyo"
    let bio      = "Jane chao swift code is ai"
    let skills   = ["python","swift","mysql","xd"]
    let experiences: [Experience] = [("swift content creator",
                                      "kevin",
                                      "2024.3",
                                      "now"),
                                      ("app developer",
                                       "777",
                                       "2024.3",
                                       "2024.4"),
                                      ("web developer",
                                       "333",
                                       "2024.5",
                                       "2024.6")]
    let phoneurl = "tel://818090913047"
    let socialMedia: [(name: String, url: String)] =
                                       [("linkedIn","https://www.linkedin.com/in/yu-hou-snoopy9527/"),
                                        ("wechat","Jacky3k"),
                                        ("youtube","vc3island@hotmail.com")]
}
