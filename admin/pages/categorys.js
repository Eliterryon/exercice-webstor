import Layout from "@/components/Layout";
import PopupYesNo from "@/components/popupYesNo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function categorys(){
    const [isEditing, setIsEditing] = useState (null)   
    const [name, setName] = useState ('')   
    const [parent, setParent] = useState(); 

    const [categorys, setCategorys] = useState([]);

    function getCategorys(){
        axios.get("/api/categorysAPI").then(response => {
            setCategorys(response.data)
        });
    }

    async function saveCategory(ev){
        ev.preventDefault()
        ev.stopPropagation()
        const data ={name, parent};
        if(!isEditing)
            await axios.post("/api/categorysAPI", data);
        else {
            data._id = isEditing._id;
            await axios.put('/api/categorysAPI', data);
            setIsEditing(null);
        }
        getCategorys()
        setName("")
        setParent("")
    }

    async function deleteCategory(){
        await axios.delete("/api/categorysAPI?id="+ dataModalYesNo.id);
        getCategorys()
        closeModalYesNo();
    }
    
    async function ModifCategory(selectedCategory){
        setIsEditing(selectedCategory);
        setName(selectedCategory.name)
        setParent(selectedCategory.parent?._id || "")
    }

    //----------------------------------------------------------------//

    const [openYesNo, setOpenYesNo] = useState(false);
    const closeModalYesNo = () => {
        dataModalYesNo.open=false
        setOpenYesNo(false);
        setDataModalYesNo(dataModalYesNo)
    };
    const openModalYesNo = (id, title) => { 
        dataModalYesNo.id = id;
        dataModalYesNo.prompt = "Do you realy wish do delete category: " + title;
        dataModalYesNo.open=true
        setOpenYesNo(true);
        setDataModalYesNo(dataModalYesNo)
    };
    const [dataModalYesNo, setDataModalYesNo] = useState({ prompt:"", open:openYesNo, close:closeModalYesNo, action:deleteCategory, id:""});

    //----------------------------------------------------------------//

    useEffect(() => {
        getCategorys();
    }, [])
    
    return (
        <Layout>
            <h1>Categorys</h1>
            <label> 
                {isEditing
                ? `Edit category ${isEditing.name}`
                : 'Create new category'} 
            </label>
            <form onSubmit={saveCategory} className="flex">
                <div className="flex w-full">
                    <input type="text" placeholder="label name" onChange={ev =>setName(ev.target.value)} value={name} className=" w-1/2 min-h-full rounded-r-none border-r-0 mb-0"/>
                    <select className=" w-1/2 border-y-2 border-slate-800" value={parent} onChange={ev =>setParent(ev.target.value)}>
                        <option key={""} value=''>none</option>
                        {categorys.map(category => ( 
                            <option key={category._id} value={category._id}>
                                {category.name} 
                            </option>
                        ))}
                    </select>
                </div>
                
                {isEditing &&
                <button type="submit" className="btn-primary whitespace-nowrap flex rounded-l-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Save edition
                </button>
                }{!isEditing &&
                <button type="submit" className="btn-primary whitespace-nowrap flex rounded-l-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    New category
                </button>
                }
            </form>

            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>
                            category name
                        </td>
                        <td>
                            parent
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {categorys.map(category => ( 
                        <tr key={category._id}>
                            <td className="w-full" >
                                {category.name} 
                            </td>
                            <td className="w-full" >
                                {category.parent?.name} 
                            </td>
                            <td className='button' >
                                <button onClick={() => ModifCategory(category)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                            </td>
                            <td className='button '>
                                <button onClick={() => openModalYesNo(category._id, category.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PopupYesNo data = {dataModalYesNo}/>
        </Layout>
    )
}