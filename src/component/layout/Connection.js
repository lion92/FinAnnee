import React, { useEffect, useState } from "react";
import "./connection.scss";
import Cookies from "universal-cookie";

function Connection() {
  const [state, setState] = useState([]);
  const[cook, setCook]=useState([""]);
  const[X, setX]=useState([-1]);
  const[Y, setY]=useState([-1]);

  const [qui, setQui] = useState([]);
  const [qui2, setQui2] = useState([]);
  function fetchdata() {
    fetch("http://localhost:8000/partieactu").then(function (response) {
      // The API call was successful!
      if (response.ok) {
        let data = response.json().then((data) => {
          setState(data.message);
        });
      }
    });
  }
  function postReq() {
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({
        email: "test10",
        password: "12345",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        resp.json().then((data) => {
          if (data.message.indexOf("Connecte") !== -1) {
            const cookies = new Cookies();
            cookies.set("email", data.message, { path: "/" });
            console.log(cookies.get("email")); // Pacman
            console.log(data.message);
          } else {
            console.log(data.message);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function postdelete() {
    fetch("http://localhost:8000/deletetir", {
      method: "POST",
      body: JSON.stringify({
        
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        resp.json().then((data) => {
       
           
            console.log(data);
     
         
          
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function postReqtir() {
    const cookies = new Cookies();
    
    if(cookies.get("email")!==undefined){
      setCook(cookies.get("email"));
    }
    else{
      console.log("veuillez vous connecter");
      return
    }
    
    fetch("http://localhost:8000/insert/tirreact", {
      method: "POST",
      body: JSON.stringify({
        email: "test10",
        posX: X,
        posY:Y
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        resp.json().then((data) => {
            console.log(data.message);
         
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function postDeconnexion() {
    /*fetch("http://localhost:8000/deconnexion", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        resp.json().then((data) => {
          console.log(data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });*/
    const cookies = new Cookies();
    cookies.remove("email");
    //   console.log(cookies.get('email')); // Pacman
  }
  function consult() {
    const cookies = new Cookies();
    console.log(cookies.get("email")); // Pacman
  }
  function aquidejouer() {
    fetch("http://localhost:8000/partieactu").then(function (response) {
      // The API call was successful!

      if (response.ok) {
        let data2 = response.json().then((data) => {
          console.log(data.message);
          let quipremier = [];
          let quideucieme = [];
          data.message.forEach((element) => {
            console.log("--" + JSON.stringify(element));
            if (element.tourj1 == 1) {
              console.log("?" + element.joueur1);
              quipremier.push("Premier :"+element.joueur1+"Deuxieme :"+element.joueur2);
           //   setQui(quipremier);
              console.log("??" + qui);
            }else{
              quipremier.push("Premier :"+element.joueur2+"Deuxieme :"+element.joueur1);
            }
            if (element.tourj1 == 0) {
              console.log("?" + element.joueur2);
              quideucieme.push(element.joueur2);
              setQui2(quideucieme);
              console.log("??" + qui);
            }
          });
          setQui(quipremier);
          setQui2(quideucieme);
        });
      }
    });
  }
  function tirspresent() { 
   
    fetch("http://localhost:8000/tirs").then(function (response) {
      // The API call was successful!
    
      if (response.ok) {
        let data2 = response.json().then((data) => {
          console.log(data);
          for(let i=0; i<data.length;i++){
            if(document.getElementById("td"+data[i].placeX+data[i].placeY)){
          document.getElementById("td"+data[i].placeX+data[i].placeY).style.backgroundColor="red";
          }
        }
         
        });
      }
      
    });
    
  }


  function tir() {
    const cookies = new Cookies();
    if (cookies.get("email") !== undefined) {
      console.log("Veuillez vous connecter!");
    } else {
      console.log(cookies.get("email")); // Pacman
    }
  }
  return (
    <>
    <div>
      <label>posX</label>
      <input onChange={e=>setX(e.target.value)}></input>
      <label>posY</label>
      <input onChange={e=>setY(e.target.value)}></input>
    </div>
      <div>
        <div>
          {qui.map((d) => (
            <div>
              <p>{d} </p>
            </div>
          ))}
        </div>

      </div>
      <div style={{ display: "flex" }}>
        <button onClick={() => postReq()}>Connection</button>
        <button onClick={() => postDeconnexion()}>deconnexion</button>
        <button onClick={() => consult()}>consulter</button>
        <button onClick={() => aquidejouer()}>premier</button>
        <button onClick={() => postReqtir()}>tirchoix</button>
        <button onClick={() => tirspresent()}>tirpresent</button>
        <button onClick={() => document.getElementById("td01").style.backgroundColor ="blue"}>color</button>
        <button onClick={() =>  postdelete()}>delete</button>
        <div>
          {state.map((d) => (
            <div>{d.joueur2}</div>
          ))}
        </div>
        <div>
          {state.map((d) => (
            <div>
              {d.tourj1}
              <span> </span>
            </div>
          ))}
        </div>
        <div>
          {state.map((d) => (
            <div>{d.idAdversaire} </div>
          ))}
        </div>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td id="td1">0</td>
              <td id="td2">1</td>
              <td id="td3">2</td>
              <td id="td4">3</td>
              <td id="td5">4</td>
            </tr>
            <tr></tr>
            <tr id="0">
              <td id="td00">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td01">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td02">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td03">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td04">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td05">0</td>
            </tr>

            <tr id="1">
              <td id="td10">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td11">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td12">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td13">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td14">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td15">1</td>
            </tr>
            <tr id="2">
              <td id="td20">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td21">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td22">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td23">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td24">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td25">2</td>
            </tr>
            <tr id="3">
              <td id="td30">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td31">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td32">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td33">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td34">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td35">3</td>
            </tr>
            <tr id="4">
              <td id="td40">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td41">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td42">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td43">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td44">
                <img src="https://krissclotilde.com/wp-content/uploads/2019/05/sea.png" />
              </td>
              <td id="td45">4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Connection;
