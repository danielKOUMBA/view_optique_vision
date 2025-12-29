import React, { useState } from "react"
import Header from "../Components/header"
import Footer from "../Components/footer"
import { TrashIcon} from "@heroicons/react/16/solid"
import { apiFetch } from "../api/api"





type Todo={
    id:string
    nom:string
    numero:string
    produits:string 
    prix_avancer:string
    prix_total:string
    status:string 
    date:string 
    type:string
}
export default function Commandes(){
    const[res,setRes]=useState<string>('')
    const[nom,setNom]=useState('')
    const[numero,setNumero]=useState('')
    const[produit,setProduit]=useState('')
    const[date,setDate]=useState('')
   
    const[type,setType]=useState('')
    const[prix_avancer,setPrix_avancer]=useState('')
    const[prix_total,setPrix_payer]=useState('')
    const [update,setUpdate]=useState<Todo|null>(null)
    const [error,setError]=useState<string>('')
   setTimeout(()=>setError(''),5000)

    const[allCommande,setAllcommande]=useState<Todo[]>([])
   

    setTimeout(()=>setRes(''),8000)
async function handleSubmit(e){
    e.preventDefault()
    try{
        const response= await apiFetch('/api/commande',{
            method:'POST',
            body:JSON.stringify({nom,numero,produit,date,type,prix_avancer,prix_total})
        })
        if (response.erreur){
            setError(response.erreur)
        }else{
            setRes(response.message)
            console.log(response.message)
        }
       
     
    }catch(err){
        console.log(err)
    }
}

async function AllCommande(){
    try{
        const data=await apiFetch('/api/allCommande',{
            method:'POST'
        })
        if (data.erreur){
            setError(data.erreur)
        }else{
            setAllcommande(data)
        }
            
        
    }catch(err){
        console.log(err)
    }
}

async function OnDelete(commande:Todo){
    try{
        const res=await apiFetch('/api/deleteCommande',{
            method:'POST',
            body:JSON.stringify({'id':commande.id})
        }) 
        setAllcommande(res)
    }catch(err){
        console.log(err)
    }
    

}

async function handleEdit(commandes:Todo,e){
   e.preventDefault()
    try{
        const data=await apiFetch('/api/updateCommande',{
            method:'PUT',
            body:JSON.stringify(commandes)
        })
        if (data.erreur){
            setError(data.erreur)
        }else{
            setUpdate(null)
        }
    }catch(err){
        console.log(err)
    }
}



    return(<>
    <Header/>
     <div className="flex justify-center">
        <div className="absolute top-20 mx-3 border border-black rounded-lg p-5">
            <form onSubmit={handleSubmit}>
                    <h1  className="mb-4 font-bold">
                        Entrez vos nouvelles commandes
                    </h1>
                    <input type="text" placeholder="nom du client..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setNom(e.target.value)} required/>
                    <input type="number" placeholder="numero du client..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setNumero(e.target.value)} required/>
                    <input type="text" placeholder="produits commander..."  className="mt-1 block p-1 border-b border-black "  onChange={(e)=>setProduit(e.target.value)} required/>
                    <select value={type} onChange={(e)=>setType(e.target.value)} required>
                        <option value="Optique">Optique</option>
                        <option value="Progressive">Progressive</option>
                        <option value="Photochromique">Photochromique</option>
                        <option value="Solaire">Solaire</option>
                        <option value="Percee">Percee</option>
                        <option value="Accessoire">Accessoire</option>
                    </select>
                    <input type="date"  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setDate(e.target.value)} required/>
                    <input type="number" placeholder="prix avancer..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setPrix_avancer(e.target.value)}required/>
                    <input type="number" placeholder="prix total..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setPrix_payer(e.target.value)}required/>
                    <button type="submit" className="mt-2 border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer shadow-lg">enregistrer</button>
                    {res && <div className="mt-1 w-full p-1 bg-green-500 mx-auto rounded-lg">{res}</div>}
            </form>       
        </div>
     </div>
     {update&&
     <div className="flex justify-center ">
      <div className="absolute top-110 z-1 bg-white p-5 w-1/2 flex flex-wrap justify-center border border-black rounded-lg m-2">
        <form>
            <p className="font-bold absolute right-2 top-0 w-2" onClick={()=>setUpdate(null)}>X</p>
            <input  className="mt-1 block p-1 border-b border-blue " type="text" value={update.nom} onChange={(e)=>setUpdate({...update,nom:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-blue " type="number" value={update.numero}  onChange={(e)=>setUpdate({...update,numero:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-blue " type="text" value={update.produits} onChange={(e)=>setUpdate({...update,produits:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-blue "  type="text" value={update.prix_avancer} onChange={(e)=>setUpdate({...update,prix_avancer:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-blue "  type="number" value={update.prix_total} onChange={(e)=>setUpdate({...update,prix_total:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-blue " type="date" value={update.date} onChange={(e)=>setUpdate({...update,date:e.target.value})} />
            <input  className="mt-1 block p-1 border-b border-blue " type="text" value={update.type} onChange={(e)=>setUpdate({...update,type:e.target.value})} />
            <button className="mt-2 border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer shadow-lg" onClick={(e)=>handleEdit(update,e)}>enregistrer</button>
           
        </form>
      </div>
    </div>
    }
     
    <div className="flex justify-center">
        <div className="absolute top-140 flex items-center gap-3">
            <button className="border border-blue-900 bg-blue-100 p-2 rounded-lg cursor-pointer shadow-lg" onClick={AllCommande}>voir toutes les commandes</button>

        </div>
    </div>
    {error && <div className="absolute top-120 left-1/4 bg-red-500 text-center p-2 w-1/2 flex justify-center mx-auto rounded-lg ">
        {error}
        </div>}
    <div className="absolute top-160 pb-30 flex justify-center">
        <ul className="space-y-4">
            <li>
                {allCommande.map((commande)=>(
                    <div key={commande.id} className="mt-1 border border-black m-2 p-2 rounded-lg  flex items-center gap-2">
                        <p className="font-bold">Nom: <span className="text-black">{commande.nom}</span></p>
                        <p className="font-bold">Numero: <span className="text-black">{commande.numero}</span></p>
                        <p className="font-bold">type: <span className="text-black">{commande.type}</span></p>
                        <p className="font-bold">produits: <span className="text-black">{commande.produits}</span></p>
                        <p className="font-bold">prix avancer: <span className="text-black">{commande.prix_avancer} fcfa</span></p>
                        <p className="font-bold">prix de l'article: <span className="text-black">{commande.prix_total} fcfa</span></p>
                        <p className="font-bold">statuts: <span className="text-black">{commande.status}</span></p>
                        <p className="font-bold">date: <span className="text-black">{commande.date}</span></p>
                        <button onClick={()=>OnDelete(commande)}>
                            <TrashIcon className="w-6" color="red"/>
                        </button>  
                        <button className="bg-blue-100 p-1 border border-black rounded-lg shadow-lg" onClick={()=>setUpdate(commande)}>
                            modifier
                        </button>
                    </div>
                ))}
            </li>
        </ul>
    </div>
     
    <Footer/>
    </>)
}