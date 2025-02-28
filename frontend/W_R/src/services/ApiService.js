//import axios from "axios";

const LOGIN_URL = "http://localhost:8585/user/login";
const ADMINLOGIN_URL = "http://localhost:8585/admin/login";

export async function getLoginDetailsFromServer(formValues) {
    return axios.post(LOGIN_URL, formValues);
}

export async function getAdminLoginDetailsFromServer(formValues) {
    return axios.post(ADMINLOGIN_URL, formValues);
}