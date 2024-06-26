import Layout from "@/components/Layout";
import PopupYesNo from "@/components/popupYesNo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function setting() {
    const [data, setData] = useState("");

    function getCategorys(){
        axios.get("/api/treeCategorysAPI").then(response => {
            console.log(JSON.stringify(response.data, null, 2))
            setData(JSON.stringify(response.data, null, 2))
        });
    }

    useEffect(() => {
        getCategorys();
    }, [])

    return(
        <Layout>
            {data}
        </Layout>
    )
   
}
