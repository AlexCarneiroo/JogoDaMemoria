import styled from "styled-components";


type ContainerProp={
    showBackground:Boolean
}

export const Container = styled.div<ContainerProp>`
    background-color: ${props => props.showBackground ? '#1550FF' : '#E2E3E3'};
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;


type IconProps={
    opacity?:number
}

export const icon = styled.img<IconProps>`
    width: 40px;
    height: 40px;
    opacity: ${props => props.opacity ?? 1};
`;