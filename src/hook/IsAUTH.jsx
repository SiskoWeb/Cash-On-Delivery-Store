import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

 export const isAuthFunction = ()=>{
    const navigator = useNavigate()
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user.uid === 'lHUrrNztBFSVeOBzkzWiSfZrQWV2') {
console.log('yes admin login')

    // ...
  } else {
    console.log('no admin login')
    navigator('/login')
  }
});
}