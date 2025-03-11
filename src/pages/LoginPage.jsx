import { InputField } from "../components/InputField/InputField";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { SectionTitle } from "../components/SectionTitle/SectionTitle"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <MarginContainer>
      <SectionTitle title="Velkommen tilbage" />
      <form>
        <InputField
          labelText="Email"
          placeholder="Din Email..."
          img={"./icons/atIcon.png"}
        />
        <InputField
          labelText="Password"
          placeholder="Din password..."
          img={"./icons/secureIcon.png"} />
        <p>Har du ikke allerede en konto? Klik <a onClick={() => navigate(`/signup`)} >her</a> for at gå til sign up</p>
      </form>
    </MarginContainer>
  )
}
