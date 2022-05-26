import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
    word: string;
};

const animation = keyframes`
  0% { opacity: 0; transform: translateY(-100px); }
  25% { opacity: 1; transform: translateY(0px); }
  75% { opacity: 1; transform: translateY(0px); }
  100% { opacity: 0; transform: translateY(-100px); }
`;

const Wrapper = styled.span`
    animation-name: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    display: inline-block;

    span {
        opacity: 0;
        display: inline-block;
        animation-name: ${animation};
        animation-duration: 6s;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
    }
    span:nth-child(1) {
        animation-delay: 0.1s;
    }
    span:nth-child(2) {
        animation-delay: 0.2s;
    }
    span:nth-child(3) {
        animation-delay: 0.3s;
    }
    span:nth-child(4) {
        animation-delay: 0.4s;
    }
    span:nth-child(5) {
        animation-delay: 0.5s;
    }
`;

const AnimatedText = (props: Props) => {
    const wordArray = props.word.split("");
    return (
        <Wrapper>
            {wordArray.map((item, index) => (
                <span key={index}>{item}</span>
            ))}
        </Wrapper>
    );
};

export default AnimatedText;
