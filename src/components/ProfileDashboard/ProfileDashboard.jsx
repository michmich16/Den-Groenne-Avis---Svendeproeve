import { useState, useContext } from "react";
import { InputField } from "../InputField/InputField";
import { UserContext } from "../../context/UserContext";
import s from './ProfileDashboard.module.scss';
import { useNavigate } from "react-router-dom";
import { GridContainer } from "../GridContainer/GridContainer";
import { MarginContainer } from "../MarginContainer/MarginContainer";

export const ProfileDashboard = () => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [newsLetter, setNewsLetter] = useState(false);
    const [notification, setNotification] = useState(false);
    const [signUpMessage, setSignUpMessage] = useState("");
    const [error, setError] = useState("");
    const { userToken } = useContext(UserContext);
    const navigate = useNavigate();

    function updateUser() {
        const body = new URLSearchParams();
        body.append("email", email);
        body.append("firstname", firstname);
        body.append("lastname", lastname);
        body.append("address", address);
        body.append("city", city);
        body.append("zipcode", zip);
        body.append("hasNotification", notification);
        body.append("hasNewsletter", newsLetter);

        const options = {
            method: "PATCH",
            body: body,
            redirect: "follow",
            headers: { Authorization: `Bearer ${userToken}` }
        };

        fetch("http://localhost:4242/users", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("User updated successfully:", data);
                setSignUpMessage("Dine ændringer er gemt!");
            })
            .catch((error) => {
                console.error("API request error: ", error);
                setError("Hov! Der skete en fejl. Prøv igen senere");
            });
    }

    function deleteUser() {
        const options = {
            method: "DELETE",
            redirect: "follow",
            headers: { Authorization: `Bearer ${userToken}` }
        };

        fetch("http://localhost:4242/users", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                console.log("User deleted successfully:", data);
                setSignUpMessage("Din konto er slettet!");
                sessionStorage.removeItem("userData");
                sessionStorage.removeItem("userToken");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error("API request error: ", error);
                setError("Hov! Der skete en fejl. Prøv igen senere");
            });
    }

    return (
        <>
            <div id="profileDashboard" className={s.profileDashboard}>
                <form>
                    <GridContainer columns="1fr 1fr">
                        <div className={s.inputFormStyle}>
                            <InputField type="text" placeholder="Din fornavn..." name="Firstname" id="firstnameField" labelText="Fornavn" action={setFirstname} />
                            <InputField type="text" placeholder="Din efternavn..." name="Lastname" id="lastnameField" labelText="Efternavn" action={setLastname} />
                            <InputField type="text" placeholder="Din addresse..." name="Address" id="addressField" labelText="Adresse" action={setAddress} />
                            <InputField type="text" placeholder="Din by..." name="city" id="cityField" labelText="By" action={setCity} />
                            <InputField type="text" placeholder="Din postnummer..." name="zip" id="zipField" labelText="Postnummer" action={setZip} />
                            <InputField type="email" placeholder="Din email..." name="Email" id="emailField" labelText="Email" action={setEmail} />
                        </div>
                        <div className={s.checkBoxDiv}>
                            <span>
                                <label htmlFor="newsLetter">Jeg ønsker at modtage nyheder om klima-indsatsen, gode tilbud, ekslusive deals og lignende promoverings-mails fra den grønne avis og samarbejds-parnere?</label>
                                <input
                                    type="checkbox"
                                    name="newsLetter"
                                    id="newsLetterFieldYes"
                                    checked={newsLetter}
                                    onChange={(e) => setNewsLetter(e.target.checked)}
                                />
                            </span>
                            <span>
                                <label htmlFor="notification">Jeg ønsker at modtage notifikationer i form af emails når der sker en opdatering på en af mine annoncer eller jeg modtager en ny henvendelse?</label>
                                <input
                                    type="checkbox"
                                    name="notification"
                                    id="notificationFieldYes"
                                    checked={notification}
                                    onChange={(e) => setNotification(e.target.checked)}
                                />
                            </span>
                        </div>
                    </GridContainer>
                </form>
                <div className={s.buttonsDiv}>
                    <button onClick={() => deleteUser()}>slet profil</button>
                    <button onClick={(e) => { e.preventDefault(); updateUser(); }}>gem ændringer</button>
                </div>
                {signUpMessage && <p>{signUpMessage}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
};
