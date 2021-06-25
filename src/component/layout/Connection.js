import React, { useEffect, useState } from "react";
import "./connection.scss";
import Cookies from "universal-cookie";

function Connection() {
  const [state, setState] = useState([]);
  const [cook, setCook] = useState([""]);
  const [X, setX] = useState([-1]);
  const [Y, setY] = useState([-1]);

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
      body: JSON.stringify({}),
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

    if (cookies.get("email") !== undefined) {
      setCook(cookies.get("email"));
    } else {
      console.log("veuillez vous connecter");
      return;
    }

    fetch("http://localhost:8000/insert/tirreact", {
      method: "POST",
      body: JSON.stringify({
        email: "test10",
        posX: X,
        posY: Y,
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
              quipremier.push(
                "Premier :" + element.joueur1 + "Deuxieme :" + element.joueur2
              );
              //   setQui(quipremier);
              console.log("??" + qui);
            } else {
              quipremier.push(
                "Premier :" + element.joueur2 + "Deuxieme :" + element.joueur1
              );
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
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (document.getElementById("td" + i + j)) {
          if (document.getElementById("td" + i + j)) {
            document.getElementById("td" + i + j).classList.remove("tir");
          }
        }
      }
    }
    fetch("http://localhost:8000/tirs").then(function (response) {
      // The API call was successful!

      if (response.ok) {
        let data2 = response.json().then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            if (
              document.getElementById("td" + data[i].placeX + data[i].placeY)
            ) {
              document
                .getElementById("td" + data[i].placeX + data[i].placeY)
                .classList.add("tir");
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
      <div className="container">
        <header>
          <h1>Bataille Navale</h1>
        </header>
        <div className="nav"></div>
        <div className="centrer">
          <div className="plateauJeu">
            <div>
              <label>posX</label>
              <input onChange={(e) => setX(e.target.value)}></input>
              <label>posY</label>
              <input onChange={(e) => setY(e.target.value)}></input>
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
            <div className="but">
              <button onClick={() => postReq()}>Connection</button>
              <button onClick={() => postDeconnexion()}>deconnexion</button>
              <button onClick={() => consult()}>consulter</button>
              <button onClick={() => aquidejouer()}>premier</button>
              <button onClick={() => postReqtir()}>tirchoix</button>
              <button onClick={() => tirspresent()}>tirpresent</button>
              <button
                onClick={() =>
                  (document.getElementById("td01").style.backgroundColor =
                    "blue")
                }
              >
                color
              </button>
              <button onClick={() => postdelete()}>delete</button>
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
            <header></header>
            <nav></nav>

            <div className="container2">
              <div id="td00">
                <span>0</span>
              </div>
              <div id="td01">
                <span>1</span>
              </div>
              <div id="td02">
                <span>2</span>
              </div>
              <div id="td03">
                <span>3</span>
              </div>
              <div id="td04">
                <span>4</span>
              </div>

              <div id="td10">
                <span>1</span>
              </div>
              <div id="td11"></div>
              <div id="td12"></div>
              <div id="td13"></div>
              <div id="td14"></div>

              <div id="td20">
                <span>2</span>
              </div>
              <div id="td21"></div>
              <div id="td22"></div>
              <div id="td23"></div>
              <div id="td24"></div>

              <div id="td30">
                <span>3</span>
              </div>
              <div id="td31"></div>
              <div id="td32"></div>
              <div id="td33"></div>
              <div id="td34"></div>

              <div id="td40">
                <span>4</span>
              </div>
              <div id="td41"></div>
              <div id="td42"></div>
              <div id="td43"></div>
              <div id="td44"></div>
            </div>
          </div>
        </div>
        <footer>kriss.clotilde@gmail.com</footer>
      </div>
    </>
  );
}

export default Connection;
