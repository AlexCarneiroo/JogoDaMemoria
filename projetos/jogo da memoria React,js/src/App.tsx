import * as C from './App.styles';
import Logo from './assets/devmemory_logo.png';
import logoReset from './svgs/restart.svg'
import { Button } from './components/button';
import { ItemInfo } from './components/itemInfo';
import { useEffect,useState } from 'react';
import { GridItemType } from './types/GridItemType';
import { GridItem } from './components/GridItem'
import { items } from './data/items';
import { timerHelps } from './helps/timerHelps';

const App=()=>{

  const [playing,setPlaying]= useState<boolean>(false);
  const [timeElapsed,setTimeElapsed]= useState<number>(0);
  const [moveCount,setMoveCount]= useState<number>(0);
  const [shownCount,setShownCount]= useState<number>(0);
  const [gridItems, setGridIems] = useState<GridItemType[]>([])


  useEffect(()=> reset,[])

  useEffect(()=> {
    let timer = setInterval(()=>{
      if(playing){
        setTimeElapsed(timeElapsed + 1)
      }
    },1000)

    return ()=> clearInterval(timer)

  },[playing,timeElapsed])


  useEffect(()=>{
    
    if(shownCount === 2){
      let oponent = gridItems.filter(item => item.shown == true)

      if(oponent.length == 2){

        let tmpGrid = [...gridItems]
        // v1 - verificar se os shown estão permanent

        if(oponent[0].item === oponent[1].item){
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanetShown = true
              tmpGrid[i].shown = false
            }
          }
          setGridIems(tmpGrid);
          setShownCount(0);

        }else{
          setTimeout(()=>{
            let tmpGrid = [...gridItems]
            for(let i in tmpGrid){
              tmpGrid[i].shown = false
            }
            setGridIems(tmpGrid);
            setShownCount(0);
          },1000)
        }

      }

      setMoveCount(moveCount => moveCount + 1)
      
    }

  },[shownCount,gridItems])


  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanetShown == true)){
      setPlaying(false)
    }
  },[moveCount,gridItems])

  const reset = ()=>{

  // passo 1 - resetar o jogo
  setTimeElapsed(0)
  setMoveCount(0)
  setShownCount(0)

  // passo 2 - Criar o Grid

  // passo 3 - Criar o Grid Vazio
  let tmpGrid: GridItemType[] = [];
  for(let i = 0; i < (items.length * 2); i++){
    tmpGrid.push({
      item:null, shown:false ,permanetShown:false
    })
  }

  // passo 4 - preencher o Grid

  for(let w=0; w < 2;w++){
    for(let i=0;i < items.length;i++){
      let pos = -1
      
      while(pos < 0 || tmpGrid[pos].item !== null){
        pos = Math.floor(Math.random() * (items.length * 2));
      }

      tmpGrid[pos].item = i;
    }
  }


  // passo 5 - jogar na State
  setGridIems(tmpGrid)

  // passo 6 começar o jogo
  setPlaying(true)

  }


  const handlClick = (index:number)=>{
    if(playing && index !== null && shownCount < 2){
      let tmpGrid = [...gridItems];

        if(tmpGrid[index].permanetShown === false && tmpGrid[index].shown === false ){
          tmpGrid[index].shown = true;
          setShownCount(shownCount +1)
        }

        setGridIems(tmpGrid)

    }

  }

  return(
    <C.Container>
      <C.info>
        <C.LogoLink href=''>
          <img src={Logo} width={200} alt="" />
        </C.LogoLink>
        <C.infoArea>
          <ItemInfo label='Tempo' value={timerHelps(timeElapsed)}/>
          <ItemInfo label='Movimento' value={moveCount.toString()}/>
        </C.infoArea>
          
          <Button label='Reiniciar' icon={logoReset} onClick={reset} />
      </C.info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item,index)=>(
            <GridItem
              key={index}
              item={item}
              onClick={()=>handlClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>

  )
}


export default App;