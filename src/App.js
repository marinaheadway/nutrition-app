import { useEffect, useState } from 'react';
import './App.css'; 
import Nutrition from './Nutrition';
import LoaderPage from './Loader/LoaderPage';
import Swal from 'sweetalert2';


function App() {

const MY_ID = "f02d4016";
const MY_KEY = "9a0ddde6a26327aa04bad3703481b837";

const [mySearch, setMySearch]=useState('');
const [myNutrition, setMyNutrition]=useState();
const [stateLoader, setStateLoader]= useState(false);
const [wordSubmitted, setWordSubmitted]= useState('')

const fetchData= async (ingr) => {
  setStateLoader(true);



    const response = await fetch (`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`,{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
              },
      body:JSON.stringify({ingr : ingr })
    })

    if (response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    }
    else {
      setStateLoader(false);
      // alert ('ingredients entered incorrectly');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<h3>Ingredients entered incorrectly!!</h3>'
      });

    }
 
  }

 const myAnalysisSearch =(e) =>{
 setMySearch(e.target.value)
}

const finalSearch =(e)=> {
  e.preventDefault ();
  setWordSubmitted(mySearch)
}

useEffect(() => {
  if (wordSubmitted !== '') {
    let ingr =  wordSubmitted.split(/[,,;,\n,\r]/);
    fetchData(ingr);
  }
  }, [wordSubmitted])


  return (
<div>
    <div className="container">
    {stateLoader && <LoaderPage/>}
  </div>
    <div className="container">
      <h1>Nutrition Analysis</h1>    
    </div>

<div className="container">
  <form onSubmit={finalSearch}>
<input className='search' placeholder='1 tomato 100 gr rice...' onChange={myAnalysisSearch} value={mySearch}/>
</form>
</div>

<div className='container'>
  <button onClick={finalSearch}>
  <img width="50" height="50" src="https://img.icons8.com/cotton/64/000000/search--v1.png" alt="search--v1"/>
  </button>
</div>

{myNutrition && <p>{myNutrition.calories} kcal</p>}

{myNutrition && Object.values(myNutrition.totalNutrients)
.map(({ label, quantity, unit  }) =>
  <Nutrition
  label={label}
  quantity={quantity}
  unit={unit}/>
)}
</div>

  );

}


export default App;
