export const Nutrition = ({label, quantity, unit}) => {

    return(
        <div className="container" >
<p><b>{label}</b> - {quantity} {unit}</p>

        </div>
  

    )
}

export default Nutrition;
