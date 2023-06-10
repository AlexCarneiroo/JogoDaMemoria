import * as C from './styles';


type Props ={
    value:string
    label:string
}

export const ItemInfo = ({label,value}: Props) =>{
    return(
        <C.container>
            <C.label>{label}</C.label>
            <C.value>{value}</C.value>
        </C.container>
    )
}