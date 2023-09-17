import { redirect } from "react-router-dom"
import { auth } from "./firebase"

export async function requireAuth() {
    let user = auth.currentUser;
    if (!user) {
        throw redirect(
            "/signIn"
        )
    }else{
        return null
    }
}
