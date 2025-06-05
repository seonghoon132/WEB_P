import { session_check_profile } from "./session.js";

  

document.addEventListener("DOMContentLoaded", () => {
    session_check_profile();
  });
console.log("현재 세션 ID:", sessionStorage.getItem("Session_Storage_id"));