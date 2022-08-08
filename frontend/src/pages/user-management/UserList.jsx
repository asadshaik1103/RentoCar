import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/common/nav-bar";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const loadUserList = () => {
    fetch("https://tutorial4-api.herokuapp.com/api/users", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          if (data.status === true) {
            setUsers(data.data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const showUserProfile = (id) => {
    console.log("Id is" + id);
    props.setId(id);
    navigate("/userprofile", { userId: id });
  };
  const updateSearch = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    loadUserList();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="clearfix">
        <div className="text-center" style={{ margin: "1em" }}>
          <label htmlFor="searchValue">Enter User Name </label>
          <input
            type="text"
            id="searchValue"
            style={{ marginLeft: "1em" }}
            onChange={updateSearch}
          />
        </div>
        <div className="row">
          {users
            .filter((item) => {
              console.log("item.name");
              if (
                item.firstName
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return item;
              }
            })
            .map((data) => (
              <div
                className="col-md-4 animated fadeIn"
                key={data.id}
                onClick={() => {
                  showUserProfile(data.id);
                }}
              >
                <div className="card">
                  <div className="card-body">
                    <div className="avatar">
                      <img src={data.picture} className="card-img-top" alt="" />
                    </div>
                    <h5 className="card-title">
                      {data.title + ". " + data.firstName + " " + data.lastName}
                    </h5>
                    <p className="card-text">
                      {data.email}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default UserList;
