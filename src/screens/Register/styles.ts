import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Container = styled(GestureHandlerRootView)`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(112)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 16px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-between;

    padding: 24px;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 8px;
    margin-bottom: 16px;
`;
