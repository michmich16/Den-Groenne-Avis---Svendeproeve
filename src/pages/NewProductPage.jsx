import { InputField } from "../components/InputField/InputField"
import { UserContext } from "../context/UserContext"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../components/SectionTitle/SectionTitle";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";

export const NewProductPage = () => {
  const { userToken, setUserData, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      {userToken ? (
        <>
          <MarginContainer>
            <SectionTitle title="Opret ny annoce" text='Her kan du opret en ny annonce Du har mulighed for at slette dine annoncer igen under "min konto" siden' />
            <form>
              <InputField
                labelText="Titel"
                type="text"
                placeholder="Title for din produkt..."
              />
              <InputField
                labelText="Kategori"
                type="input"
                placeholder="Hvilken kategori tilhører dit produkt........"
              />
              <InputField
                labelText="Annoce tekst"
                type="text"
                placeholder="Hvilken kategori tilhører dit produkt........"
              />
              <InputField
                labelText="URL til billede"
                type="text"
                placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."
              />
              <InputField
                labelText="Pris"
                type="text"
                placeholder="Pris...."
              />
            </form>
            <button>Opret</button>
          </MarginContainer>
        </>
      ) : (
        <div>Du skal logge ind først!!!

          <button onClick={() => navigate('/login')}>Gå til login</button>
        </div>
      )}
    </>
  )
}
