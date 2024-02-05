import React, { useEffect,useState } from 'react';
import './App.css';

const App = () => {
 const url = "http://104.128.95.54:9000/users";
 const [users, setUsers] = useState([])

 useEffect(() => {
   fetch(url, { method: "GET" })
     .then((res) => res.json())
     .then((data) => {
       setUsers(data);
     })
     .catch((err) => {
       console.log(err);
       console.log("err");
     });
 }, []);

    return (
      <div classname="App">
        <h1>Users2</h1>
        {users.map((user,index) =>
          <div key={index}>{user.name}</div>
        )}
      </div>
    );
}

export default App;
