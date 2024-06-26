import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactSortable} from "react-sortablejs"

export default function ProductForm ({_id, title:existingTitle, description:existingDescription, price:existingPrice, images:existingImages, categogy:existingCategogy}){
    const router = useRouter()

    const [isUploading,setIsUploading] = useState(false);

    const[title, setTitle] = useState(existingTitle || '');
    const[categogy, setCategogy] = useState(existingCategogy || '');
    const[description, setDescription] = useState(existingDescription || '');
    const[price, setPrice] = useState(existingPrice || '');
    const[images,setImages] = useState(existingImages || []);

    const[goBack, setGoBack] = useState('');
    
    const [categorys, setCategorys] = useState([]);

    async function uploadImages(ev){
        setIsUploading(true);
        const files = ev.target?.files;
        if (files?.length > 0){
            const data = new FormData();
            for (const file of files){
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data);
            
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    async function saveProduct(ev) {
        ev.preventDefault();
        const data =  {title, description, price, images, categogy};
        if (_id) {
            //update
            await axios.put("/api/productsAPI", {...data, _id});
        } else {
            //creat
            await axios.post("/api/productsAPI", data);
        }
        setGoBack(true);            
    }
    if(goBack) {
        router.push('/product')
    }

    function updateImagesOrder(images){
        setImages(images)
    }

    function getCategorys(){
        
    }

    useEffect(() => {
        axios.get("/api/categorysAPI").then(response => {
            setCategorys(response.data)
        })//3;
    }, [])

    return (
        <form className="flex flex-col " onSubmit={saveProduct}>
            <label>Product name</label>
            <input 
                type="text" 
                placeholder="Product name"
                value={title}
                onChange={ev =>setTitle(ev.target.value)}/>

            <label>Category</label>
            <select className="border-2 my-2 mb-4 border-slate-600 rounded-lg" value={categogy} onChange={ev =>setCategogy(ev.target.value)}>
                <option value='' selected>Uncategorized</option>
                {categorys.map(category => ( 
                    <option value={category._id}>
                        {category.name} 
                    </option>
                ))}
            </select>

            <label>Images</label>
            <div className=" my-2 mb-6 flex overflow-auto shrink-0 gap-2 p-2 border-2 border-slate-600 rounded-lg">
                <ReactSortable list={images} setList={updateImagesOrder} className=" flex flex-wrap shrink-0 gap-2">
                    {!!images?.length && images.map(link => (
                        <div key={link} >
                            <img src={link} className="h-24 rounded-lg" />
                        </div>
                    ))}
                </ReactSortable>
                <label className="size-24 justify-center items-center flex bg-slate-400 rounded-lg cursor-pointer shrink-0" > 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10" hidden={isUploading}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" hidden={!isUploading}>
                        <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
                            <animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.3s" values="1;13"/>
                            <animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.3s" values="1;13"/>
                            <animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.3s" values="13;1"/>
                            <animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.3s" values="13;1"/>
                        </rect>
                        <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
                            <animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.3s" values="13;1"/>
                            <animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.3s" values="1;13"/>
                            <animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.3s" values="1;13"/>
                            <animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.3s" values="13;1"/>
                        </rect>
                        <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
                            <animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.3s" values="13;1"/>
                            <animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.3s" values="13;1"/>
                            <animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.3s" values="1;13"/>
                            <animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.3s" values="1;13"/>
                        </rect>
                    </svg>

                    <input type="file" onChange={uploadImages} className="hidden" accept="image/*"/>
                </label>
            </div>

            <label>Description</label>
            <textarea 
                className="my-2 mb-6"
                type="text"
                placeholder="Description"
                value={description}
                onChange={ev =>setDescription(ev.target.value)}/>

            <label>Price</label>
            <input 
                className="my-2 mb-6" 
                type="text"
                placeholder="price"
                value={price}
                onChange={ev =>setPrice(ev.target.value)}/>

            <button type="submit" className="my-2 mb-6 btn-primary">Save</button>
        </form>
    )
}