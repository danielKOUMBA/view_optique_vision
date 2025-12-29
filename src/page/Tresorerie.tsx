import React, { useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Dashboard from "../Components/dashboard";
import { apiFetch } from "../api/api";
import { ChartData } from "chart.js";
import { FaPlus,FaMinus } from "react-icons/fa";


type info={
    id:number
    nom:string
    prix:number
    date:string
    reste_a_payer:number
    type:string
    si:number 
    sf:number
}
type My_Data= ChartData<'bar',number[],string>
export default function Tresorerie(){
const[res,setRes]=useState('')
const[msg,setmsg]=useState('')
setTimeout(()=>setmsg(''),5000)
const[data,setData]=useState<My_Data>({
    'labels':[],
    'datasets':[]
})
const [info,setInfo]=useState<info[]>([])
const noms=['Autres','Marketing','Transport et Livraison','Conception','Salaire']

async function tresor(){
        try{
            const response=await apiFetch('/api/tresorerie',{
                method:'POST',
            })
            setRes(response)
        }catch(err){
            console.log(err)
        }
        
    }
 async function datas(){
        try{
            const response=await apiFetch('/api/dash',{
                method:'POST',
            })
            setData({
                labels:response.labels,
                datasets:[
                    { 
                    label:'Ventes',
                    data:response.values,
                    backgroundColor:'rgba(75,192,192,0.4)'
                    }
            ]
        })
      

        }catch(err){
            console.log(err)
        }
       }

 async function handleView(){
    try{
        const data=await apiFetch('/api/tresor_items',{
            method:'POST'
        })
        if (data.items){
            setInfo(data.items)  
        }else{
            setmsg(data.message)
            console.log(msg)
        }
       
    }catch(err){
        console.log(err)
    }
 }
    return(<>
    <Header/>
    {msg && <div className=" absolute bg-red-500 left-1/4 w-1/2 flex justify-center top-120 rounded-lg p-1">{msg}</div>}
    <div className="flex justify-center" >
        <div className="absolute top-16">
                <h1 className="font-bold">Statistique en temps reel du chiffre d'affaire</h1>
                <div className="absolute top-25 ">
                    <p className="font-bold ">Tresorerie:{res?res+'fcfa':0+'fcfa'}</p>
                    <button className=" border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer" onClick={tresor}>Afficher la tresorerie</button>
                    
                </div>
               
            </div>
            <div className="absolute top-65 ">
                <p className="mt-1 font-bold">statistique comparant le type de verre:</p>
                
                <button className=" border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer" onClick={datas}>rafraichir</button>
       
                    <Dashboard data={data} />
               
                
            </div>
    </div>
   
    
    <div className="flex justify-center">
        <div className="absolute top-135 pb-35 ">
            <div className="m-2 flex justify-center">
                  <button className="border border-black-500 mb-2 p-2 rounded-lg bg-blue-100" onClick={(handleView)}>Voir les details</button>    
            </div>
             
              {info.map((inf)=>(
                <div className='flex justify-between gap-2 w-full p-3 border border-black-500 rounded-lg m-1' key={inf.id}>
                    <p>{noms.includes(inf.nom)? ("Nature de l'operation"):('Nom') }: {inf.nom}</p>
                    <p>PRIX : {inf.prix}</p>
                    <p>DATE : {inf.date}</p>
                    <p>Reste a payer : {inf.reste_a_payer}</p>
                    <p>type : {inf.type} {inf.type=='entree'?(<FaPlus color="white" className="bg-green-500 rounded-full p-1"/>):(<FaMinus color="white" className="bg-red-500 rounded-full p-1"/>)}</p>
                    <p>Solde initial:{inf.si}</p>
                    <p>Solde final:{inf.sf}</p>
                </div>
                
              ))}
              
        </div>
    </div>
        
    <Footer/>
    </>)
}