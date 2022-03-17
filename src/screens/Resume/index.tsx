import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadingContainer,
} from './styles';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    color: string;
    name: string;
    total: number;
    totalFormatted: string;
    percent: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    function handleChangeDate(action: 'next' | 'prev') {
        if (action === 'next')
            setSelectedDate(addMonths(selectedDate, 1));
        else
            setSelectedDate(subMonths(selectedDate, 1));
    }

    async function loadData() {
        setIsLoading(true);

        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const totalByCategory: CategoryData[] = [];
        const expensives = responseFormatted.filter((expensive: TransactionData) => 
            expensive.type === 'negative' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        );

        const expensiveTotal = expensives.reduce((acc: number, expensive: TransactionData) => {
            return acc + Number(expensive.amount);
        }, 0);

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (category.key === expensive.category)
                    categorySum += Number(expensive.amount);
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    color: category.color,
                    name: category.name,
                    total: categorySum,
                    totalFormatted,
                    percent,
                });
            }
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadData()
        }, [selectedDate])
    );

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: 16,
                }}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                        <MonthSelectIcon name="chevron-left" />
                    </MonthSelectButton>

                    <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                    <MonthSelectButton onPress={() => handleChangeDate('next')}>
                        <MonthSelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>

                {isLoading ? (
                    <LoadingContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadingContainer>
                ) : (
                    <>                    
                        <ChartContainer>
                            <VictoryPie
                                data={totalByCategories}
                                colorScale={totalByCategories.map(category => category.color)}
                                x="percent"
                                y="total"
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape,
                                    }
                                }}
                                labelRadius={50}
                            />
                        </ChartContainer>

                        {totalByCategories.map(category => (
                            <HistoryCard
                                key={category.key}
                                color={category.color}
                                title={category.name}
                                amount={category.totalFormatted}
                            />
                        ))}
                    </>
                )}
            </Content>
        </Container>
    );
}
