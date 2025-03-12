import React from 'react'
import { InputField } from '../components/InputField/InputField'
import { useNavigate } from 'react-router-dom'
import { Donation } from '../components/Donation/Donation'
import { GridContainer } from '../components/GridContainer/GridContainer'
import { MarginContainer } from '../components/MarginContainer/MarginContainer'

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const navigate = useNavigate();

  function submitData() {
    const body = new URLSearchParams();
    body.append("username", email); 
    body.append("password", password);
    body.append("firstname", firstname); 
    body.append("lastname", lastname);
    body.append("address", address); 
    body.append("city", city);
    body.append("zipcode", zip); 

    const options = {
      method: "POST", //post method
      body: body,
    };

    fetch("http://localhost:4242/users", options)
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

  return (
    <>
      <MarginContainer>
        <form>
          <InputField
            type="email"
            placeholder="Din email..."
            name="Email"
            id="emailField"
            action={setEmail}
          />
          <InputField
            type="password"
            placeholder="Din password..."
            name="password"
            id="passwordField"
            action={setPassword}
          />
          <InputField
            type="text"
            placeholder="Din fornavn..."
            name="Firstname"
            id="firstnameField"
            action={setFirstname}
          />
          <InputField
            type="text"
            placeholder="Din efternavn..."
            name="Lastname"
            id="lastnameField"
            action={setLastname}
          />
          <InputField
            type="text"
            placeholder="Din addresse..."
            name="Address"
            id="addressField"
            action={setAddress}
          />
          <InputField
            type="text"
            placeholder="Din by..."
            name="city"
            id="cityField"
            action={setCity}
          />
          <InputField
            type="text"
            placeholder="Din postnummer..."
            name="zip"
            id="zipField"
            action={setZip}
          />
        </form>
        <p>Har du allerede en konto hos os? Klik <a onClick={() => navigate('/login')}>her</a> for at vende tilbage til login</p>
        <input type="checkbox" />
        <button>Opret</button>
        <GridContainer columns="1fr 1fr">
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
