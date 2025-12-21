import Footer from "../Components/footer";
import React, { useState } from "react";
import Header from "../Components/header";
import {TrashIcon} from "@heroicons/react/16/solid";
import { apiFetch } from "../api/api";

type Cout={
    id:number
    nom:string 
    date:string 
    prix:number
}


export default function Cout(){
      const[depense,setDepense]=useState('')
      const[date,setDate]=useState('')
      const[somme,setSomme]=useState('')
      const[res,setRes]=useState('')
      const [error,setError]=useState('')
      const[allcout,setAllcout]=useState<Cout[]>([])
      setTimeout(()=>setRes(''),4000)
      setTimeout(()=>setError(''),4000)
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response=await apiFetch('/api/cout',{
                method:'POST',
                body:JSON.stringify({depense,date,somme})
            })
            if (response.erreur){
                setError(response.erreur)
            }else{
                setRes(response)
            }
            
            setDate('')
            setDepense('')
            setSomme('')
        }catch(err){
            console.log(err)
        }
    }

    async function allCout(){
        try{
            const data=await apiFetch('/api/allCout',{
                method:'POST'
            })
            if (data.erreur){
                setError(data.erreur)
            }else{
                setAllcout(data)
            }
          
        }catch(err){
            console.log(err)
        }
    }

    async function OnDelete(cout:Cout){
        try{
            const res=await apiFetch('/api/deleteCout',{
                method:'POST',
                body:JSON.stringify({'id':cout.id})
            })
            setAllcout(res)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    return(<>
    <Header/>
      <div className="flex justify-center">
        <div className="absolute top-1/4 mx-3 border border-black rounded-lg p-5">
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-4 font-bold">Enregistrez une recente depense</h1>
                        <input type="text" placeholder="type de la depense..." className="mt-1 block p-1 border-b border-black " value={depense} onChange={(e)=>setDepense(e.target.value)} required/>
                        <input type="date" placeholder="date du jour..." className="mt-1 block p-1 border-b border-black " value={date}  onChange={(e)=>setDate(e.target.value)} required />
                        <input type="number" placeholder="somme de la depense..." className="mt-1 block p-1 border-b border-black " value={somme}  onChange={(e)=>setSomme(e.target.value)} required/>
                        <button type="submit" className="mt-2 border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer">enregistrer</button>
                        {res&& <div className="mt-1 bg-green-500 p-1 rounded-lg">{res}</div>}
                </form> 
            </div>
        </div> 
        
         <div className="flex justify-center">
            <div className="absolute top-120 flex gap-3">
                    <button className="border border-blue-900 bg-blue-100 p-2 rounded-lg cursor-pointer" onClick={allCout}><p>
                    Voir toutes les depenses
                            </p>
                        </button>
                  
                   
                </div>
         </div>
         {error && <div className="absolute top-105 left-1/4 bg-red-500 text-center p-2 w-1/2 flex justify-center mx-auto rounded-lg ">
        {error}
        </div>}

            <div className="absolute top-150 pb-20 w-full flex justify-center">
                <ul>
                    <li>
                        {allcout.map((cout)=>(
                            <div key={cout.id} className="p-2 m-2 border border-black rounded-lg flex justify-between items-center gap-3">
                               
                                <p className="font-bold">Depense : {cout.nom}</p>
                                <p className="font-bold ">Somme : {cout.prix}fcfa</p>
                                <p className="font-bold">Date : {cout.date}</p>
                                <button onClick={()=>OnDelete(cout)}>
                                    <TrashIcon className="w-6"/>
                                </button>
                            </div>
                        ))}
                    </li>
                </ul>
            </div>
      
        
    <Footer/>
    </>)
}