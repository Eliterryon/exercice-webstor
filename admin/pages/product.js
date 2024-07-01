import Layout from "@/components/Layout";
import PopupYesNo from "@/components/popupYesNo";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function product() {
    const [products, setProducts] = useState([]);
    const [isFetured, setIsFetured] = useState([]);
    const [open, setOpen] = useState(false);

    function getProducts(){
        axios.get("/api/productsAPI").then(response => {
            setProducts(response.data)
        })
    }
    
    function getisFetured(){
        axios.get("/api/featuredAPI").then(response => {
            let result = response.data.map(({ _id }) => _id)
            setIsFetured(result)
        })
    }
    
    const closeModal = () => {
        dataModal.open=false
        setOpen(false);
        setDataModal(dataModal)
    };
    const openModal = (id, title) => {   
        dataModal.id = id;
        dataModal.prompt = "Do you really wish do delete item: " + title;
        dataModal.open=true
        setOpen(true);
        setDataModal(dataModal)
    };
    const [dataModal, setDataModal] = useState({ prompt:"", open:open, close:closeModal, action:deleteProduct, id:""});

    async function deleteProduct(){
        await axios.delete("/api/productsAPI?id="+ dataModal.id);
        getProducts()
        closeModal();
    }

    async function onFeatured(e, _id){
        const checked = e.target.checked;
        if (checked){
            const data = {"_id" : _id};
            await axios.post("/api/featuredAPI", data);
            e.target.checked = true;
        }
        if (!checked) {
            await axios.delete("/api/featuredAPI?id="+ _id);
            e.target.checked = false;
        }

    }
    useEffect(() => {
        getisFetured();
        getProducts();
    }, [])

    return (
        <Layout>
            <Link href={'/product/New'} className= 'btn-primary flex '> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Nouveaux Produit
            </Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>
                            Product name
                        </td>
                        <td>Featured</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => ( 
                    <tr key={product._id}>
                        <td className="w-full" >
                            {product.title} 
                        </td>
                        <td>
                            <input type="checkbox" onChange={(e)=>(onFeatured(e, product._id))} checked={isFetured.includes(product._id)?(true):(false)} />
                        </td>
                        <td className='button' >
                            <Link href={'/product/edit/'+ product._id}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </Link>
                        </td>
                        <td className='button '>
                            <button type="button" className="button" onClick={() => openModal(product._id, product.title)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>    
            <PopupYesNo data = {dataModal}/>
        </Layout>
    )
}
