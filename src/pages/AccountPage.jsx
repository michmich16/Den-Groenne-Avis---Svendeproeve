import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { SectionTitle } from "../components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import { ProfileDashboard } from "../components/ProfileDashboard/ProfileDashboard";
import { MyListing } from "../components/MyListings/MyListings";
import { Splitter } from "../components/Splitter/Splitter";
import { useGet } from "../hooks/useGet";
import s from "./PageStyles/AccountPage.module.scss";

export const AccountPage = () => {
  const { userToken, userData } = useContext(UserContext);
  //useGet henter data
  const { isLoading: myListingsIsLoading, data: myListingsData } = useGet("http://localhost:4242/products");
  const body = new URLSearchParams();
  //state som skifter mellem min profil og min listing
  const [activeComponent, setActiveComponent] = useState("profile");
  const navigate = useNavigate();

  //delete request
  function deleteListing(id) {
    const options = {
      method: 'DELETE',
      body: body,
      headers: { Authorization: `Bearer ${userToken}` },
    };

    fetch(`http://localhost:4242/products/${id}`, options)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  return (
    <>
      {userToken ? (
        <MarginContainer>
          <Splitter marginTop={20} marginBottom={10} width={90} />
          {/* buttons som toggles hvilke sider skal vises på pagen*/}
          <div className={s.pageSwitcher}>
            <button
              onClick={() => setActiveComponent("profile")}
              className={
                activeComponent === "profile" ? s.activeButton : s.inactiveButton
              }
            >
              Min Profil
            </button>
            <button
              onClick={() => setActiveComponent("listings")}
              className={
                activeComponent === "listings" ? s.activeButton : s.inactiveButton
              }
            >
              Mine Annoncer
            </button>
          </div>

          {activeComponent === "profile" && <ProfileDashboard />}
          {activeComponent === "listings" &&
            (!myListingsIsLoading && myListingsData?.data?.length > 0 ? (
              myListingsData.data.map((data) => (
                <div key={data.id}>
                  <MyListing
                    name={data?.name}
                    price={data?.price}
                    description={data?.description}
                    img={data?.image}
                  />
                  <span className={s.buttonBox}>
                    <button onClick={() => navigate(`/products/${data.slug}`)}>Gå til annonce</button>
                    <button onClick={() => deleteListing(data.id)}>Fjern annonce</button>
                  </span>
                </div>
              ))
            ) : (
              <p>No listings available.</p>
            ))}
        </MarginContainer>
      ) : (
        <MarginContainer>
          <div className={s.notLoggedInDiv}>
            <p>AccountPage not logged in</p>
            <p>
              Tryk <a href="">her</a> for at gå til en login side
            </p>
          </div>
        </MarginContainer>
      )}
    </>
  );
};
