import { useHeadline } from "../context/HeadlinesContext";
import { Link } from "react-router-dom";

function HeadlineCard({ headline }) { 
  
  const {deleteHeadline}= useHeadline()
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1 className="text-2xl font-bold">{headline.nombreTitular}</h1>
      <div>
        <button onClick={()=>{
          
           deleteHeadline(headline._id)  
        }}>delete</button>
        <Link to={`/headline/${headline._id}`}>edit</Link>
      </div>
      <p className="text-slate-300">{headline.apellidoTitular}</p>
      <p>{new Date(headline.fechaAfiliacion).toLocaleDateString()}</p>
    </div>
  );
}

export default HeadlineCard;

