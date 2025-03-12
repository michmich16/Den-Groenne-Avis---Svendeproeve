import { useState } from "react";
import { InputField } from "../InputField/InputField";

export const Dashboard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [newsLetter, setNewsLetter] = useState("");
    const [notification, setNotification] = useState("");
    const [signUpMessage, setSignUpMessage] = useState("");
    const [error, setError] = useState("");

    function updateUser() {
        const body = new URLSearchParams();
        body.append("email", email);
        body.append("password", password);
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
            })
            .catch((error) => {
                console.error("API request error: ", error);
                setError("Hov! Der skete en fejl. Prøv igen senere");
            });
    }

    return (
        <>
            <div>
                <button>Min Profil</button>
                <button>Mine Annoncer</button>
            </div>
            <div id="profileDashboard">
                <form>
                    <InputField type="email" placeholder="Din email..." name="Email" id="emailField" action={setEmail} />
                    <InputField type="password" placeholder="Din password..." name="password" id="passwordField" action={setPassword} />
                    <InputField type="text" placeholder="Din fornavn..." name="Firstname" id="firstnameField" action={setFirstname} />
                    <InputField type="text" placeholder="Din efternavn..." name="Lastname" id="lastnameField" action={setLastname} />
                    <InputField type="text" placeholder="Din addresse..." name="Address" id="addressField" action={setAddress} />
                    <InputField type="text" placeholder="Din by..." name="city" id="cityField" action={setCity} />
                    <InputField type="text" placeholder="Din postnummer..." name="zip" id="zipField" action={setZip} />
                    <InputField type="radio" name="newsLetter" id="newsLetterFieldYes" value="yes" action={setNewsLetter} />
                    <InputField type="radio" name="notification" id="notificationFieldYes" value="yes" action={setNotification} />
                </form>
                <button onClick={deleteUser}>slet profil</button>
                <button onClick={updateUser}>gem ændringer</button>
                {signUpMessage && <p>{signUpMessage}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
};
