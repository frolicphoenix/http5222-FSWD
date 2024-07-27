export default function Studios(props) {

    return (
        // <p> {props.image} {props.title} {props.description} {props.productions} </p> 
        <div>
            <p>{props.number}</p>
            <img src={props.image}></img>
            <h3>{props.title}</h3>
            <p>{props.desc}</p>
            <p>{props.prod}</p>
        </div>
    );
}