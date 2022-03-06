import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TextInput`
    width: 100%;
    padding: 16px;

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.title};

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 8px;

    margin-bottom: 8px;
`;
