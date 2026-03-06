import  React  from "react"
import Header from "../Components/header"
import Footer from "../Components/footer"


export default function Accueil(){

  return (
  <>
  
    <Header />
    <main
    style={{
    padding: "80px 20px",
    background: "#f0f9ff",
    minHeight: "70vh",
    textAlign: "center",
    fontFamily: "Arial"
    }}
    >
    <h1
    style={{
    fontSize: "42px",
    color: "#0369a1"
    }}
    >
    Gérez votre activité simplement
    </h1>
    
    <p
    style={{
    marginTop: "15px",
    fontSize: "18px",
    color: "#475569"
    }}
    >
    Suivez vos finances, analysez vos performances et optimisez votre gestion.
    </p>
    
    <button
    style={{
    marginTop: "25px",
    padding: "12px 30px",
    backgroundColor: "#38bdf8",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
    }}
    >
    Commencer
    </button>
    
    <div
    style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
    }}
    >
    <div style={ {
    background: "white",
    padding: "25px",
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    border: "1px solid #e0f2fe"
    }}>
    <h3 style={{ color: "#0284c7" }}>Suivi financier</h3>
    <p>Visualisez vos revenus et dépenses en temps réel.</p>
    </div>
    
    <div style={ {
    background: "white",
    padding: "25px",
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    border: "1px solid #e0f2fe"
    }}>
    <h3 style={{ color: "#0284c7" }}>Statistiques</h3>
    <p>Analysez votre activité avec des graphiques simples.</p>
    </div>
    
    <div style={ {
    background: "white",
    padding: "25px",
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    border: "1px solid #e0f2fe"
    }}>
    <h3 style={{ color: "#0284c7" }}>Gestion efficace</h3>
    <p>Organisez vos données et prenez de meilleures décisions.</p>
    </div>
    </div>
    </main>
    <Footer/>
    </>
    
    );
    }
    
   
  
 
