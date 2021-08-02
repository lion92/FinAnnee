import React, { useEffect, useState } from "react";
import "./connection.scss";
import Cookies from "universal-cookie";

function Connection() {
  const [partieSelect, setParties] = useState([]);
  const [adversaire, setAdversaire] = useState("");
  const [adversairetext, setAdversaireText] = useState("");
  const [emailconfirm, setEmailconfirm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState([]);
  const [cook, setCook] = useState([""]);
  const [X, setX] = useState([-1]);
  const [Y, setY] = useState([-1]);
  const [Idelement, setId] = useState("");
  const [qui, setQui] = useState([]);
  const [qui2, setQui2] = useState([]);
  function tir2(x1, y1) {
    postReqtir(x1, y1);
    console.log(adversaire);
    console.log(adversairetext);
  }

  useEffect(() => {
    fetchdata();
    cleartirspresent();
    tirspresentParAdversaire();
  }, [adversairetext, emailconfirm]);
  function fetchdata() {
    fetch("http://localhost:8000/partieactu").then(function (response) {
      // The API call was successful!
      if (response.ok) {
        let data = response.json().then((data) => {
          let contrequiSelect = [];

          data.message.forEach((element) => {
            if (
              emailconfirm === "" ||
              emailconfirm === undefined ||
              emailconfirm === null
            ) {
              return;
            }
            if (
              emailconfirm
                .split("Connecte ")[1]
                .split("true")[0]
                .includes(element.joueur1) ||
              emailconfirm
                .split("Connecte ")[1]
                .split("true")[0]
                .includes(element.joueur2)
            ) {
              contrequiSelect.push(element);
            }
          });
          console.log("!!" + JSON.stringify(contrequiSelect));
          setParties(contrequiSelect);
          console.log(partieSelect);
        });
      }
    });
  }

  function postReq() {
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({
        email: document.querySelector("#email").value,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        resp.json().then((data) => {
          const cookies = new Cookies();
          if (data.message.indexOf("Connecte") !== -1) {
            
            cookies.set("email", data.message, { path: "/" });
            console.log("YYYYYYYY"+cookies.get("email"));
            setEmailconfirm(cookies.get("email"));

            // Pacman
            console.log(data.message);
          } else {
            console.log(data.message);
            setEmailconfirm(cookies.get("email"));
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
          tirspresent();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function postdeleteBateau() {
    fetch("http://localhost:8000/effacerBateauBis", {
      method: "POST",
      body: JSON.stringify({
        email: new Cookies().get("email"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        resp.json().then((data) => {
          console.log(data);
          tirspresent();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function postReqtir(x2, y2) {
     let adv = "";
    console.log("----" + adversaire);
    if (
      emailconfirm === undefined ||
      emailconfirm === null ||
      emailconfirm === "" ||
      adversairetext === null ||
      adversairetext === undefined ||
      adversairetext === ""
    ) {
      return;
    }
    if (adversairetext.split("/")[1] === emailconfirm) {
      adv = adversairetext.split("/")[0];
    } else {
      adv = adversairetext.split("/")[1];
    }
    console.log("esaii" + adversairetext);
    console.log("esaii" + adversaire);
    const cookies = new Cookies();

    if (cookies.get("email") !== undefined) {
      setCook(cookies.get("email"));
    } else {
      console.log("veuillez vous connecter");
      return;
    }

    if (emailconfirm === "") {
      console.log("email incorrect");
      return;
    }
    if (adversaire === "") {
      console.log("adversaire incorrect");
      return;
    }

    fetch("http://localhost:8000/insert/tirreact", {


      method: "POST",
      body: JSON.stringify({
        email: emailconfirm.split("Connecte ")[1].split("true")[0],
        adversaire:adv,
        posX: x2,
        posY: y2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        resp.json().then((data) => {
          console.log(data.message);
          cleartirspresent();
          tirspresentParAdversaire();
          updatej1();
          updatej2();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function postReactBateau(x2, y2) {
    x2 = X;
    y2 = Y;
    const cookies = new Cookies();

    if (cookies.get("email") !== undefined) {
      setCook(cookies.get("email"));
    } else {
      console.log("veuillez vous connecter");
      return;
    }

    fetch("http://localhost:8000/insert/reactbateau/", {
      method: "POST",
      body: JSON.stringify({
        email: "test10",
        posX: x2,
        posY: y2,
        email: cook,
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
  function updatej1() {
    let adv = "";
    console.log("----" + adversaire);
    if (
      emailconfirm === undefined ||
      emailconfirm === null ||
      emailconfirm === "" ||
      adversairetext === null ||
      adversairetext === undefined ||
      adversairetext === ""
    ) {
      return;
    }
    if (adversairetext.split("/")[1] === emailconfirm) {
      adv = adversairetext.split("/")[0];
    } else {
      adv = adversairetext.split("/")[1];
    }
    console.log("////////" + adv);
    fetch("http://localhost:8000/insert/updatej1React/", {
      method: "POST",
      body: JSON.stringify({
        tourj1: 1,
        joueur1: emailconfirm.split("Connecte ")[1].split("true")[0],
        joueur2: adv,
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
  function updatej2() {
    let adv = "";
    if (
      emailconfirm === undefined ||
      emailconfirm === null ||
      emailconfirm === "" ||
      adversairetext === null ||
      adversairetext === undefined ||
      adversairetext === ""
    ) {
      return;
    }
    if (adversairetext.split("/")[1] === emailconfirm) {
      const adv = adversairetext.split("/")[0];
    } else {
      adv = adversairetext.split("/")[1];
    }

    fetch("http://localhost:8000/insert/updatej2React/", {
      method: "POST",
      body: JSON.stringify({
        tourj1: 0,
        joueur2: adv,
        joueur1: emailconfirm.split("Connecte ")[1].split("true")[0],
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
    setEmailconfirm("");
    setEmail("");
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
          let quideuxieme = [];
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
              quideuxieme.push(element.joueur2);
              setQui2(quideuxieme);
              console.log("??" + qui);
            }
          });
          setQui(quipremier);
          setQui2(quideuxieme);
        });
      }
    });
  }
  function handleClick(e) {
    // access to e.target here
    console.log(e);
  }

  function cleartirspresent() {
    console.log("passe");
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (document.getElementById("td" + i + j)) {
          if (document.getElementById("td" + i + j)) {
            document.getElementById("td" + i + j).classList.remove("tir");
          }
        }
      }
    }
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
  function tirspresentParAdversaire() {
    let adv = "";
    console.log("----" + adversaire);
    if (
      emailconfirm === undefined ||
      emailconfirm === null ||
      emailconfirm === "" ||
      adversairetext === null ||
      adversairetext === undefined ||
      adversairetext === ""
    ) {
      return;
    }
    if (adversairetext.split("/")[1] === emailconfirm) {
      adv = adversairetext.split("/")[0];
    } else {
      adv = adversairetext.split("/")[1];
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (document.getElementById("td" + i + j)) {
          if (document.getElementById("td" + i + j)) {
            document.getElementById("td" + i + j).classList.remove("tir");
          }
        }
      }
    }
    if (emailconfirm === "" || adv === "") {
      console.log("Probème sur email ou adversaire");
      return;
    }

    fetch(
      "http://localhost:8000/tirs/" +
        emailconfirm.split("Connecte ")[1].split("true")[0] +
        "/" +
        adv
    ).then(function (response) {
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
  function bateauPresent() {
    fetch("http://localhost:8000/bateauTT").then(function (response) {
      // The API call was successful!
      const cookies = new Cookies();
      if (response.ok) {
        let data2 = response.json().then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            if (
              document.getElementById("td" + data[i].bateauX + data[i].bateauY)
            ) {
              if (data.email == cookies.get("email")) {
                document
                  .getElementById("td" + data[i].bateauX + data[i].bateauY)
                  .classList.add("tir");
              }
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

        <div className="nav">
          {" "}
          <div>
            {qui.map((d) => (
              <div>
                <p>{d} </p>
              </div>
            ))}
          </div>
          <div>
            <select
               onLoad={(e) => {
                let index = e.nativeEvent.target.selectedIndex;

                setAdversaire(e.nativeEvent.target[index].value);
                setAdversaireText(e.nativeEvent.target[index].text);
              }}
            
              onChange={(e) => {
                let index = e.nativeEvent.target.selectedIndex;

                setAdversaire(e.nativeEvent.target[index].value);
                setAdversaireText(e.nativeEvent.target[index].text);
              }}
            >
              {partieSelect.map((d) => (
                <option tourj1={d.tourj1} value={d.idAdversaire}>
                  {d.joueur1}
                  {"/" + d.joueur2}{" "}
                </option>
              ))}
            </select>
          </div>
          <div>
            {state.map((d) => (
              <div>{d.joueur2}</div>
            ))}
          </div>
        </div>
        <div className="centrer">
          <div>
            <button
              onClick={() => {
                if (document.querySelector(".nav").style.display === "none") {
                  document.querySelector(".nav").style.display = "block";
                } else {
                  document.querySelector(".nav").style.display = "none";
                }
              }}
            >
              parties
            </button>
          </div>
          <div>
            <button onClick={() => cleartirspresent()}></button>
          </div>
          <div>
            <button
              onClick={() => {
                if (
                  document.querySelector("#connection").style.display === "none"
                ) {
                  document.querySelector("#connection").style.display = "block";
                } else {
                  document.querySelector("#connection").style.display = "none";
                }
              }}
            >
              Affiché connection
            </button>
          </div>
          <div id="connection">
            <div>
              <label>Email</label>
              <input id="email"
                onChange={(e) => {
                
                  setEmail(e.target.value);
                    console.log("AAAAAAAAAAAA"+email);
                }}
              ></input>
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <button onClick={() => postReq()}>Connexion</button>
            <label>adversaire</label>
            <input
              onChange={(e) => {
                setAdversaire(e.target.value);
              }}
            ></input>
          </div>
          <button onClick={() => tirspresentParAdversaire()}>
            tirsParAdversaire
          </button>
          <div className="plateauJeu">
            <div>
              <label>posX</label>
              <input
                onChange={(e) => {
                  setX(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label>posY</label>
              <input
                onChange={(e) => {
                  setY(e.target.value);
                }}
              ></input>
            </div>
            <select id="adversaireSelect"></select>
            <div className="but">
              <button onClick={() => postReq()}>Connection</button>
              <button onClick={() => postDeconnexion()}>deconnexion</button>
              <button onClick={() => consult()}>consulter</button>
              <button onClick={() => aquidejouer()}>premier</button>
              <button onClick={() => postReqtir()}>tirchoix</button>
              <button onClick={() => tirspresent()}>tirpresent</button>
              <button onClick={() => postReactBateau()}>Poser le bateau</button>
              <button onClick={() => postdeleteBateau()}>
                Poser le bateau
              </button>
              <button onClick={() => bateauPresent()}>Poser le bateau</button>

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
              <div
                onClick={() => {
                  tir2(0, 0);
                }}
                id="td00"
              >
                <span>0</span>
              </div>
              <div
                onClick={() => {
                  tir2(0, 1);
                }}
                id="td01"
              >
                <span>1</span>
              </div>
              <div
                onClick={() => {
                  tir2(0, 2);
                }}
                id="td02"
              >
                <span>2</span>
              </div>
              <div
                onClick={() => {
                  tir2(0, 3);
                }}
                id="td03"
              >
                <span>3</span>
              </div>
              <div
                onClick={() => {
                  tir2(0, 4);
                }}
                id="td04"
              >
                <span>4</span>
              </div>

              <div
                onClick={() => {
                  tir2(1, 0);
                }}
                id="td10"
              >
                <span>1</span>
              </div>
              <div
                onClick={() => {
                  tir2(1, 1);
                }}
                id="td11"
              ></div>
              <div
                onClick={() => {
                  tir2(1, 2);
                }}
                id="td12"
              ></div>
              <div
                onClick={() => {
                  tir2(1, 3);
                }}
                id="td13"
              ></div>
              <div
                onClick={() => {
                  tir2(1, 4);
                }}
                id="td14"
              ></div>

              <div
                onClick={() => {
                  tir2(2, 0);
                }}
                id="td20"
              >
                <span>2</span>
              </div>
              <div
                onClick={() => {
                  tir2(2, 1);
                }}
                id="td21"
              ></div>
              <div
                onClick={() => {
                  tir2(2, 2);
                }}
                id="td22"
              ></div>
              <div
                onClick={() => {
                  tir2(2, 3);
                }}
                id="td23"
              ></div>
              <div
                onClick={() => {
                  tir2(2, 4);
                }}
                id="td24"
              ></div>

              <div
                onClick={() => {
                  tir2(3, 0);
                }}
                id="td30"
              >
                <span>3</span>
              </div>
              <div
                onClick={() => {
                  tir2(3, 1);
                }}
                id="td31"
              ></div>
              <div
                onClick={() => {
                  tir2(3, 2);
                }}
                id="td32"
              ></div>
              <div
                onClick={() => {
                  tir2(3, 3);
                }}
                id="td33"
              ></div>
              <div
                onClick={() => {
                  tir2(3, 4);
                }}
                id="td34"
              ></div>

              <div
                onClick={() => {
                  tir2(4, 0);
                }}
                id="td40"
              >
                <span>4</span>
              </div>
              <div
                onClick={() => {
                  tir2(4, 1);
                }}
                id="td41"
              ></div>
              <div
                onClick={() => {
                  tir2(4, 2);
                }}
                id="td42"
              ></div>
              <div
                onClick={() => {
                  tir2(4, 3);
                }}
                id="td43"
              ></div>
              <div
                onClick={() => {
                  tir2(4, 4);
                }}
                id="td44"
              ></div>
            </div>
          </div>
        </div>
        <footer>kriss.clotilde@gmail.com</footer>
      </div>
    </>
  );
}

export default Connection;
