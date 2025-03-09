import axios from "axios";

const LOGIN_URL = "http://localhost:8081/user/login";
const ADMINLOGIN_URL = "http://localhost:8081/admin/login";

export async function getLoginDetailsFromServer(formValues) {
    return axios.post(LOGIN_URL, formValues);
}

export async function getAdminLoginDetailsFromServer(formValues) {
    return axios.post(ADMINLOGIN_URL, formValues);
}