import React from "react";
import { useNavigate } from "react-router-dom";

function HomeNavNavigate() {
  const nav = useNavigate();

  return (
    <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#f8fafc"}}>
      <div style={{width:340, padding:24, background:"#fff", borderRadius:8, textAlign:"center"}}>
        <h2 style={{marginBottom:16}}>Chọn đăng nhập hoặc đăng ký</h2>

        <button style={btn} onClick={() => nav("/login")}>Go to Login</button>
        <button style={{...btn, marginTop:12}} onClick={() => nav("/register")}>Go to Register</button>
      </div>
    </div>
  );
}

const btn = {
  width: "100%", padding: "10px 14px", borderRadius: 6, border: "none",
  background: "#059669", color: "white", cursor: "pointer", fontSize: 16
};
export default HomeNavNavigate;