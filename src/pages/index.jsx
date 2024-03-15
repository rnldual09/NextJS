import { useEffect } from "react";
import { useRouter } from "next/router";
import UTILS from "@/util/utl";

function Index() {

    const router = useRouter();

    useEffect(() => {

        const isLogin = UTILS.getIsLogin();

        if(isLogin) {
            router.push(`/goMain/main`);
        } else {
            router.push(`/goLogin/login`);
        }

    },[]);
}

export default Index;