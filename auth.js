module.exports = (async function() {
const fetch = require("node-fetch")
const xsrf = await fetch("https://profile.callofduty.com/cod/login").then(r => r.headers.get("set-cookie").split(";")[0].split("=")[1])
const formdata = new URLSearchParams();
formdata.append("username", process.env.COD_EMAIL);
formdata.append("password", process.env.COD_PASSWORD);
formdata.append("remember_me", "true");
formdata.append("_csrf", xsrf);

const requestOptions = {
 method: 'POST',
 headers: {"Cookie":`XSRF-TOKEN=${xsrf}; new_SiteId=cod;`}, 
 body: formdata,
};

fetch("https://profile.callofduty.com/do_login?new_SiteId=cod", requestOptions)
 .then(res => {
    if(res.ok){
        console.log("Logged in to COD API")
        process.env.COD_XSRF_TOKEN = xsrf;
    } else {
    console.log("Error when authenticating with COD API!")
    try {
        console.log(res.json())
    } catch {
        console.log(res.text() || "No log message")
    } finally {
        console.log(res);
    }
    }
 })
 })
