import { useState } from 'react'
import { InputField } from '../components/InputField/InputField'
import { useNavigate } from 'react-router-dom'
import { Donation } from '../components/Donation/Donation'
import { GridContainer } from '../components/GridContainer/GridContainer'
import { MarginContainer } from '../components/MarginContainer/MarginContainer'
import { SectionTitle } from '../components/SectionTitle/SectionTitle'
import { Splitter } from '../components/Splitter/Splitter'
import s from './PageStyles/SignUpPage.module.scss';

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const navigate = useNavigate();

  function submitData() {
    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);
    body.append("firstname", firstname);
    body.append("lastname", lastname);
    body.append("address", address);
    body.append("city", city);
    body.append("zipcode", zip);

    const options = {
      method: 'POST',
      body: body,
      redirect: 'follow'
    };

    fetch("http://localhost:4242/users", options)
      .then(response => response.text())
      .then(result => console.log(result))
      .then((data) => {
        console.log("User created successfully:", data);
        setSignUpMessage("Du har ny oprettet en konto")
        // navigate("/login"); // Redirect to login
      })
      .catch((error) => {
        console.error("API request error: ", error);
        setError("Hov! Der skete en fejl. Prøv igen senere")
      });
  }


  return (
    <>
      <MarginContainer>
        <Splitter marginTop={20} marginBottom={10} width={90} />
        <SectionTitle title="Opret en konto" textAlign='center' fontSize={30} fontWeight='300' padding="10px 0" />
        <form className={s.formStyle}>
          <div>
            <InputField
              type="email"
              placeholder="Din email..."
              name="Email"
              id="emailField"
              labelText="Email"
              action={setEmail}
            />
            <InputField
              type="password"
              placeholder="Din password..."
              name="password"
              id="passwordField"
              labelText="Password"
              action={setPassword}
            />
            <InputField
              type="text"
              placeholder="Din fornavn..."
              name="Firstname"
              id="firstnameField"
              labelText="Fornavn"
              action={setFirstname}
            />
            <InputField
              type="text"
              placeholder="Din efternavn..."
              name="Lastname"
              id="lastnameField"
              labelText="Efternavn"
              action={setLastname}
            />
            <InputField
              type="text"
              placeholder="Din addresse..."
              name="Address"
              id="addressField"
              labelText="Adresse"
              action={setAddress}
            />
            <InputField
              type="text"
              placeholder="Din by..."
              name="city"
              id="cityField"
              labelText="By"
              action={setCity}
            />
            <InputField
              type="text"
              placeholder="Din postnummer..."
              name="zip"
              id="zipField"
              labelText="Postnummer"
              action={setZip}
            />
          </div>
          <p>Har du allerede en konto hos os? Klik <a onClick={() => navigate('/login')}>her</a> for at vende tilbage til login</p>
        </form>
          <GridContainer columns='1fr 1fr' tabletColumns='1fr' mobileColumns='1fr'>
            <div className={s.checkBoxStyle}>
              <input type="checkbox" />
              <label>Jeg har læst og forstået de gældende betingelser for oprettelse af kundekonto og brug af denne side</label>
            </div>
            <button className={s.loginBtnStyle} onClick={() => submitData()}>Opret</button>
          </GridContainer>
        {error && <p>{error}</p>}
        {signUpMessage && <p>{signUpMessage}</p>}
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
