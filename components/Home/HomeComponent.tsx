import styled, { keyframes } from "styled-components";
const expandBar = keyframes`
    to{
        width: 100%;
        left: 0;
    }
`

const fadeInText = keyframes`
    to {
        opacity: 1;
    }
`

export const Homebody = styled.body`
    text-align: center;
    justify-content: center;
`

export const H1 = styled.h1`
    font-size: 80px;
    text-align: center;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    
    overflow: hidden;
    position: relative;
    height: 120px;

    &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        height: 100%;
        width: 0;
        background-color: rgb(34, 33, 33);
        //TODO: Embed keyflame
        animation: ${expandBar} 1s forwards;
    }

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        color: white;
        /* 或任何您想要的顏色 */
        //TODO: Embed keyflame
        animation: ${fadeInText} 1.5s forwards;
        animation-delay: 1s;
        /* 延遲文字出現，直到黑條展開完畢 */
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    > a{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 55px;
        color: white;
        text-decoration: none;
        top: 5px;
        /* 其他樣式保持不變 */
        opacity: 0;
        /* 初始狀態設為不可見 */
        //TODO: Embed keyflame
        animation: ${fadeInText} 0.5s forwards;

        div{
            color: white;
            width: 320px;
            height: 90px;
            display: flex;
            align-items: center;
            line-height: 90px;
            border: 5px outset gray;
            background-color: green;
            /* text-align: center; */
            align-self: center;

            img {
                position: relative;
                width: 80px;
                height: 80px;
                vertical-align: middle;
                margin-right: 30px;
                left: 25px;
            }

            &:hover{
                background-color: darkgreen;
                border: 5px inset gray;
                color: yellow;
                font-size: 52px;
                cursor: pointer;

                img{
                    width: 75px;
                    height: 75px;
                }
            }
        }

        &:nth-child(1){
            animation-delay: 0.1s;
        }

        &:nth-child(3){
            animation-delay: 0.2s;
        }
        &:nth-child(5){
            animation-delay: 0.3s;
        }

        &:nth-child(7){
            animation-delay: 0.4s;
        }

        &:nth-child(9){
            animation-delay: 0.5s;
        }
    }
`

