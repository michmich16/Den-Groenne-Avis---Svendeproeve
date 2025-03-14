import { useState } from 'react';
import { InputField } from '../components/InputField/InputField';
import { useNavigate } from 'react-router-dom';
import { Donation } from '../components/Donation/Donation';
import { GridContainer } from '../components/GridContainer/GridContainer';
import { MarginContainer } from '../components/MarginContainer/MarginContainer';
import { SectionTitle } from '../components/SectionTitle/SectionTitle';
import { Splitter } from '../components/Splitter/Splitter';
import s from './PageStyles/SignUpPage.module.scss';
import { usePageTitle } from '../hooks/usePageTitle';

export const SignUpPage = () => {
  usePageTitle('Sign Up - Den Grønne Avis');
  // alle usestate til at holde styr på state [gemmer, opdater]
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [signUpMessage, setSignUpMessage] = useState("");

  const navigate = useNavigate();

  // validation & regex
  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^[A-Za-z\d@$!%*?&]{5,}$/;

    if (!email || !emailRegex.test(email)) newErrors.email = "Ikke gyldig email";
    if (!password || !passwordRegex.test(password)) newErrors.password = "Password opfyler ikke vores krav";
    if (!firstname || firstname.length < 2) newErrors.firstname = "Fornavn skal være mindst 2 tegn";
    if (!lastname || lastname.length < 2) newErrors.lastname = "Efternavn skal være mindst 2 tegn";
    if (!address) newErrors.address = "Adresse er påkrævet";
    if (!city) newErrors.city = "By er påkrævet";
    if (!termsAccepted) newErrors.terms = "Du skal acceptere vore vilkår";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // submit ny bruger
  function submitData() {
    //tjek validation er ok
    if (!validateInputs()) return;

    //append body til API
    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);
    body.append("firstname", firstname);
    body.append("lastname", lastname);
    body.append("address", address);
    body.append("city", city);
    body.append("zipcode", zip);
    //POST request til at create
    const options = {
      method: 'POST',
      body: body,
      redirect: 'follow'
    };
    //fetch med post som option
    fetch("http://localhost:4242/users", options)
      .then(response => response.text())
      .then(result => {
        console.log("User created successfully:", result);
        setSignUpMessage("Du har ny oprettet en konto");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        navigate('/login')
      })
      .catch(error => {
        console.error("API request error: ", error);
        setErrors({ general: "Hov! Der skete en fejl. Prøv igen senere" });
      });
  };

  return (
    <>
      <MarginContainer>
        <Splitter marginTop={20} marginBottom={10} width={90} />
        <SectionTitle
          title="Opret en konto"
          textAlign="center"
          fontSize={30}
          fontWeight="300"
          padding="10px 0"
        />
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
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <InputField
              type="password"
              placeholder="Din password..."
              name="password"
              id="passwordField"
              labelText="Password"
              action={setPassword}
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

            <InputField
              type="text"
              placeholder="Din fornavn..."
              name="Firstname"
              id="firstnameField"
              labelText="Fornavn"
              action={setFirstname}
            />
            {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname}</p>}

            <InputField
              type="text"
              placeholder="Din efternavn..."
              name="Lastname"
              id="lastnameField"
              labelText="Efternavn"
              action={setLastname}
            />
            {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname}</p>}

            <InputField
              type="text"
              placeholder="Din addresse..."
              name="Address"
              id="addressField"
              labelText="Adresse"
              action={setAddress}
            />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}

            <InputField
              type="text"
              placeholder="Din by..."
              name="city"
              id="cityField"
              labelText="By"
              action={setCity}
            />
            {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}

            <InputField
              type="text"
              placeholder="Din postnummer..."
              name="zip"
              id="zipField"
              labelText="Postnummer"
              action={setZip}
            />
            {errors.zip && <p style={{ color: 'red' }}>{errors.zip}</p>}
          </div>
          <p>
            Har du allerede en konto hos os? Klik{' '}
            <a onClick={() => navigate('/login')}>her</a> for at vende tilbage til login
          </p>
        </form>
        <GridContainer columns="1fr 1fr" tabletColumns="1fr" mobileColumns="1fr">
          <div className={s.checkBoxStyle}>
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="termsCheckbox">
              Jeg har læst og forstået de gældende betingelser for oprettelse af kundekonto og brug af denne side
            </label>
          </div>
          {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
          <button className={s.loginBtnStyle} onClick={() => submitData()}>
            Opret
          </button>
        </GridContainer>
        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
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

