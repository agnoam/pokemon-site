export interface ListTileProps {
    name: string;
    color: string;
    iconURL: string;
}

const ListTile = (props: ListTileProps) => {
    return (
        <div>
            <img src={props.iconURL} style={{width: '160px', height: '160px'}} />
            <p>{props.name}</p>
        </div>
    );
}

export default ListTile;