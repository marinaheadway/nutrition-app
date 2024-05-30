export const Nutrition = ({label, quantity, unit}) => {

    return(
        <div className="container" >
<p><b>{label}</b> - {quantity.toFixed(2)} {unit}</p>

        </div>
  

    )
}

export default Nutrition;
