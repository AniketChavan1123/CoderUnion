import {API} from '../../backend';
// API MEANS http://localhost:8000/api/

export const signup = (user) => {
    return fetch(`${API}/signup`,{
    method: "POST",
    headers:{
        Accept: "application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user)})
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
};

export const signin = user => {
    return fetch(`${API}/signin`,{
    method: "POST",
    headers:{
        Accept: "application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user)})
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
};

export const authenticate=(data,next)=>{
    if(typeof window!=="undefined")
    {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
        // remember the bearer token
    }
};

export const signout = next => {
    if(typeof window!="undefined")
    {
        localStorage.removeItem("jwt");
        next();
        // next allows us to have callback
        return fetch(`${API}/signout`,{
            method: "GET"
        })
        // clearing jwt token after signout
        .then(response=>console.log("signOut success"))
        .catch(err => console.log(err))
    }
};

export const isAuthenticated=()=>{
    if(typeof window=="undefined")
    {
        return false;
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
};
// first we are trying to get window object
// in which we are saving this jwt
// if we don't get access of window...it means user is not authenticated
// else if get access to window and local storage of jwt
// we are not directly returning true rather whatever jwt value is
// and in frontend means our component we are going to again check it
// whether the token is exactly same as the user we are looking up for
// then only we are going to fire this up as true
