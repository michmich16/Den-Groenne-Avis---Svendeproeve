import s from './PageStyles/LoginPage.module.scss'
import { InputField } from "../components/InputField/InputField";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { SectionTitle } from "../components/SectionTitle/SectionTitle"
import { useNavigate } from "react-router-dom";
import { Donation } from '../components/Donation/Donation';
import { GridContainer } from '../components/GridContainer/GridContainer';
import { Splitter } from '../components/Splitter/Splitter';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { userToken, setUserData, setUserToken } = useContext(UserContext);

  function submitData() {
    const body = new URLSearchParams();
    body.append("username", email); //henter email fra email usestate
    body.append("password", password); //henter password fra email usestate

    const options = {
      method: "POST", //post method
      body: body,
    };

    fetch("http://localhost:4242/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.access_token) {
          setUserData(data.data); // Save user data
          setUserToken(data.data.access_token); // Save the token
          setLoginMessage("Du er nu logget ind");
          setError(""); // Clear any previous error
        } else {
          setLoginMessage("Forkert brugernavn eller password");
        }
        console.log(data);
      })
      .catch(() => {
        setError("Noget gik galt, prøv igen senere");
        setLoginMessage(""); // Clear any previous message
      });
  }



  const logOut = () => {
    setUserData(null);
    setUserToken(null);
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");
  };

  const navigate = useNavigate();
  return (
    <>
      <MarginContainer>
        {userToken ? ( //turnary operator, hvis userToker er der så vis Admininstator component ellers vis login form med InputBox
          <div>
            <h2>Du er nu logget ind <button onClick={logOut}>Logud</button></h2>
            <button onClick={() => { navigate('/min-konto') }}>Gå til din konto</button>
          </div>
        ) : (
          <>
            <Splitter marginTop={20} marginBottom={10} width={90} />
            <SectionTitle title="Velkommen tilbage" textAlign='center' fontSize={30} fontWeight='300' padding="10px 0" />
            <form className={s.formStyle}>
              <div>
                <InputField
                  labelText="Email"
                  type="email"
                  placeholder="Din email..."
                  name="Email"
                  id="emailField"
                  action={setEmail}
                  img={"./icons/atIcon.png"}
                />
                <InputField
                  labelText="Password"
                  type="password"
                  placeholder="Din password..."
                  name="Password"
                  id="passwordField"
                  action={setPassword}
                  img={"./icons/secureIcon.png"} />
                <p>Har du ikke allerede en konto? Klik <a onClick={() => navigate(`/signup`)} >her</a> for at gå til sign up</p>
              </div>
            </form>
            <GridContainer columns='1fr 1fr' tabletColumns='1fr' mobileColumns='1fr'>
              <span></span>
              <button className={s.loginBtnStyle} onClick={() => submitData()}>
                LOGIN
              </button>
            </GridContainer>
            {error && <p className={s.errorMessage}>{error}</p>}
            {loginMessage && <p className={s.loginMessage}>{loginMessage}</p>}
          </>
        )}
        <Splitter marginTop={20} marginBottom={10} width={90} />

        <GridContainer columns="1fr 1fr" tabletColumns='1fr' mobileColumns='1fr'>
          <Donation
            img='./images/banner_image2.jpg'
            title="Donationer til Dato"
            text="Sammen med dig har vi siden starten indsamlet:"
            money="452.231,50 kr"
            ending="Tak fordi du handler med omtanke for klimaet"
          />
          <Donation
            img='./images/banner_image3.jpg'
            title="Donationer i år"
            text="Sammen med dig har vi i år indsamlet:"
            money="112.452,75 kr"
            ending="Tak fordi du handler med omtanke for klimaet"
          />
        </GridContainer>
      </MarginContainer>
    </>
  )
}
