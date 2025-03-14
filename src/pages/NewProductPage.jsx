import { InputField } from "../components/InputField/InputField"
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../components/SectionTitle/SectionTitle";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { Splitter } from "../components/Splitter/Splitter";
import s from './PageStyles/NewProductPage.module.scss'

export const NewProductPage = () => {
  const { userData, userToken, setUserData, setUserToken } = useContext(UserContext);
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const navigate = useNavigate();

  function submitNewproduct() {
    const body = new URLSearchParams();
    body.append("name", name)
    body.append("image", image)
    body.append("description", description)
    body.append("price", price)
    body.append("category_id", categoryId)

    const options = {
      method: 'POST',
      body: body,
      headers: { Authorization: `Bearer ${userData?.access_token}` }
    };

    fetch("http://localhost:4242/products", options)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <>
      {userToken ? (
        <>
          <MarginContainer>
            <Splitter marginTop={20} marginBottom={10} width={90} />
            <SectionTitle title="Opret ny annoce" textAlign="center" fontSize="32px" padding="1rem 0" />
            <SectionTitle text='Her kan du opret en ny annonce Du har mulighed for at slette dine annoncer igen under "min konto" siden' textAlign="center" padding="1rem 0" />
            <form className={s.formStyle}>
              <InputField
                labelText="Titel"
                type="text"
                placeholder="Title for din produkt..."
                action={setName}
              />
              <InputField
                labelText="Kategori"
                type="text"
                placeholder="Hvilken kategori tilhører dit produkt........"
                action={setCategoryId}
              />

              <InputField
                type="text"
                placeholder="Skriv en annonce tekst her der beskriver produktet"
                action={setDescription}
                labelText="Annoce tekst"
              />
              <InputField
                labelText="URL til billede"
                type="text"
                placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."
                action={setImage}
              />
              <InputField
                labelText="Pris"
                type="text"
                placeholder="Pris...."
                action={setPrice}
              />
            </form>
            <div className={s.buttonBox}>
              <button className={s.loginBtnStyle} onClick={() => submitNewproduct()}>Opret</button>
            </div>

          </MarginContainer>
        </>
      ) : (
        <MarginContainer>
          <div> <h2>Du skal logge ind først!!!</h2> </div>
          <button className={s.loginBtnStyle} onClick={() => navigate('/login')}>Gå til login</button>
        </MarginContainer>

      )}
    </>
  )
}
