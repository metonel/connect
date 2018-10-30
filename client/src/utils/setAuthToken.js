import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //axios ne permite sa aplicam tokenul la fiecare requaet
    axios.defaults.headers.common["Authorization"] = token; //in headet pune tokenul ca val pt Authorization
  } else {
    //sterge headerul auth
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
