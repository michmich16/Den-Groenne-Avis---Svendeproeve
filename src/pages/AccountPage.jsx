import { InputField } from "../components/InputField/InputField";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { SectionTitle } from "../components/SectionTitle/SectionTitle"
import { useNavigate } from "react-router-dom";

export const AccountPage = () => {
  const { userToken, setUserData, setUserToken } = useContext(UserContext);
  return (
    <>
      {userToken ? (
        <div>AccountPage logged in</div>
      ) : (
        <div>AccountPage not logged in</div>
      )}
    </>
  )
}
