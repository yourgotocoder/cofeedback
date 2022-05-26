import React from "react";
import styled, { keyframes } from "styled-components";
import {
    commonStyle,
    sizeContainer,
    borderRadiusContainerSize,
    sizeItem,
} from "./style";

type Props = {
    style?: object;
    color?: string;
    speed?: number;
    size?: "default" | "small" | "large";
};

const animate = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
`;

const LoadingContainer = styled("div")<{ size: string }>`
    width: ${(props) =>
        props.size === "small" ? 40 : props.size === "large" ? 60 : 50}px;
    height: ${(props) =>
        props.size === "small" ? 40 : props.size === "large" ? 60 : 50}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: nowrap;
`;

const Item = styled("div")<{
    size: "small" | "default" | "large";
    speed: number;
}>`
    width: ${(props) => sizeItem[props.size] || sizeItem["default"]};
    height: ${(props) => sizeItem[props.size] || sizeItem["default"]};
    border-radius: 50%;
    background: ${(props) => props.color || "#00adb5"};
    animation: ${animate} ${(props) => props.speed || 0.8}s ease-in-out
        alternate infinite;
`;

const ItemFirst = styled(Item)`
    animation-delay: -${(props) => props.speed / 2 || 0.4}s;
`;

const ItemTwo = styled(Item)`
    animation-delay: -${(props) => props.speed / 4 || 0.2}s;
`;

const Loading = ({
    style = commonStyle,
    color,
    speed = 1,
    size = "default",
}: Props) => {
    return (
        <LoadingContainer style={style} size={size}>
            <ItemFirst color={color} speed={speed} size={size} />
            <ItemTwo color={color} speed={speed} size={size} />
            <Item color={color} speed={speed} size={size} />
        </LoadingContainer>
    );
};

export default Loading;
