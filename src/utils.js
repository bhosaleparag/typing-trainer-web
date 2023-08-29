import { redirect } from "react-router-dom"

export async function requireAuth() {
    const isLoggedIn = await localStorage.getItem("loggedin")
    if (!isLoggedIn) {
        throw redirect(
            "/signIn"
        )
    }else{
        return null
    }
}
