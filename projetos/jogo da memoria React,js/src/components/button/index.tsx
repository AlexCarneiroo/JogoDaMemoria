import * as C from './styles';

type Props = {
    label:string
    icon:any
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button = ({label,icon,onClick}:Props) =>{

    return(
    <C.container onClick={onClick}>
        <C.iconArea>
            <C.icon src={icon}/>
        </C.iconArea>
        <C.label>{label}</C.label>
    </C.container>        
    )

}