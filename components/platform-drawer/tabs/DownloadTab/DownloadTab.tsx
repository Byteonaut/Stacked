import { CoreText } from '@/components/core/CoreText';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ComplexLoadingCard } from './components/ComplexLoadingCard';
import { DownloadTabCard } from './components/DownloadTabCard';

type CardState = 'default' | 'loading' | 'finished';

interface SubCard {
  title: string;
  description?: string;
}

interface CardData {
  title: string;
  description?: string;
  subCardData?: SubCard[];
}

interface DownloadTabProps {
  onSuccess: () => void;
}

export const DownloadTab: React.FC<DownloadTabProps> = ({ onSuccess }) => {
  const cardData: CardData[] = [
    {
      title: "Connecting to platform",
    },
    {
      title: "Finding Active Slates",
      description: "4 leagues found",
    },
    {
      title: "Loading Leagues",
      description: "4 leagues loaded",
      subCardData: [
        { title: 'League Delta' },
        { title: 'League Alpha' },
        { title: 'League Gamma' },
        { title: 'League Beta' },
      ],
    },
    {
      title: "Downloading Drafts"
    },
    {
      title: "Calculating Exposures/Data"
    }
  ];

  const [cardStates, setCardStates] = useState<CardState[]>(() => 
    cardData.map((_, index) => index === 0 ? 'loading' : 'default')
  );
  const [allCardsFinished, setAllCardsFinished] = useState(false);
  
  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    
    const processNextCard = (currentIndex: number) => {
      if (currentIndex >= cardData.length) {
        setAllCardsFinished(true);
        return;
      }
      
      setCardStates(prev => {
        const newStates = [...prev];
        newStates[currentIndex] = 'loading';
        return newStates;
      });
      
      if (cardData[currentIndex].subCardData) {
        return;
      }
      
      const timeoutId = setTimeout(() => {
        setCardStates(prev => {
          const newStates = [...prev];
          newStates[currentIndex] = 'finished';
          return newStates;
        });
        
        processNextCard(currentIndex + 1);
      }, 3000);
      
      timeoutIds.push(timeoutId);
    };
    
    processNextCard(0);
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [cardData.length]);

  const handleComplexCardComplete = (cardIndex: number) => {
    setCardStates(prev => {
      const newStates = [...prev];
      newStates[cardIndex] = 'finished';
      return newStates;
    });
    
    processCard(cardIndex + 1);
  };

  const processCard = (index: number) => {
    if (index >= cardData.length) {
      setAllCardsFinished(true);
      return;
    }

    setCardStates(prev => {
      const newStates = [...prev];
      newStates[index] = 'loading';
      return newStates;
    });

    if (cardData[index].subCardData) {
      return;
    }

    setTimeout(() => {
      setCardStates(prev => {
        const newStates = [...prev];
        newStates[index] = 'finished';
        return newStates;
      });
      
      processCard(index + 1);
    }, 3000);
  };

  useEffect(() => {
    if (allCardsFinished) {
      onSuccess();
    }
  }, [allCardsFinished, onSuccess]);

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      {cardData.map((card, index) => {
        if (card.subCardData) {
          return (
            <ComplexLoadingCard
              key={index}
              title={card.title}
              description={card.description}
              state={cardStates[index]}
              subCardData={card.subCardData}
              onComplete={() => handleComplexCardComplete(index)}
            />
          );
        }
        
        return (
          <DownloadTabCard
            key={index}
            title={card.title}
            state={cardStates[index]}
            description={card.description}
          />
        );
      })}
      <View style={styles.footer}>
        <CoreText type="body" size="medium" color="subdued" style={{ textAlign: 'center' }}>
          We'll redirect you once done.
        </CoreText>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 16,
  },
  footer: {

  }
});