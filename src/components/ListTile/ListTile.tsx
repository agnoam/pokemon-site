import './ListTile.css';

export interface ListTileProps {
    name: string;
    color: string;
    iconURL: string;
}

const ListTile = (props: ListTileProps) => {
    return (
        <div className='tile' style={{background: props.color}}>
            <img src={props.iconURL} alt={`${props.name} Icon`} />
            <p>{props.name}</p>
        </div>
    );
}

export default ListTile;