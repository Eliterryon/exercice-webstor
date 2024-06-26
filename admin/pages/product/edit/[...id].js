import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const router = useRouter()
    const id = router.query.id

    const [productInfo, setProductInfo] = useState();

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/productsAPI?id='+id).then(respons => {
            setProductInfo(respons.data)
        })
    }, [id])

    
    return(
        <Layout>
            <h1> Edit Product</h1>
            {productInfo &&(
            <ProductForm {...productInfo}/>)}
        </Layout>
    );
}