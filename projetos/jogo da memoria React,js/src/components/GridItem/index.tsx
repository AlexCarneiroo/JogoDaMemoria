import { GridItemType } from '../../types/GridItemType';
import * as C from './style';
import b7Svg from '../../svgs/b7.svg';
import { items } from '../../data/items';

type Props = {
    item:GridItemType,
    onClick: ()=> void
}

export const GridItem = ({item, onClick}: Props)=>{
    return (
        <C.Container
            showBackground={item.permanetShown || item.shown}
            onClick={onClick}>
            {item.permanetShown === false && item.shown === false &&
                <C.icon src={b7Svg} alt='' opacity={.1} />
            }
            {(item.permanetShown || item.shown) && item.item !== null &&
                <C.icon src={items[item.item].icon} alt=''/>
            }
        </C.Container>        
    )
    

}