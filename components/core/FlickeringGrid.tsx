import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

interface FlickeringGridProps {
  width?: number;
  height?: number;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
  style?: any;
}

interface GridSquare {
  id: string;
  x: number;
  y: number;
  opacity: Animated.Value;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  width = Dimensions.get('window').width,
  height = 500,
  squareSize = 4,
  gridGap = 6,
  color = '#6B7280',
  maxOpacity = 0.5,
  flickerChance = 0.1,
  style,
}) => {
  const [squares, setSquares] = useState<GridSquare[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate grid dimensions
  const totalSquareSize = squareSize + gridGap;
  const cols = Math.floor(width / totalSquareSize);
  const rows = Math.floor(height / totalSquareSize);

  // Initialize grid squares
  useEffect(() => {
    const newSquares: GridSquare[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newSquares.push({
          id: `${row}-${col}`,
          x: col * totalSquareSize,
          y: row * totalSquareSize,
          opacity: new Animated.Value(0),
        });
      }
    }
    
    setSquares(newSquares);
  }, [cols, rows, totalSquareSize]);

  // Flickering animation
  useEffect(() => {
    if (squares.length === 0) return;

    const flicker = () => {
      squares.forEach((square) => {
        if (Math.random() < flickerChance) {
          // Random flicker animation
          const targetOpacity = Math.random() * maxOpacity;
          const duration = 200 + Math.random() * 800; // 200-1000ms
          
          Animated.timing(square.opacity, {
            toValue: targetOpacity,
            duration,
            useNativeDriver: true,
          }).start(() => {
            // Fade back out
            Animated.timing(square.opacity, {
              toValue: 0,
              duration: duration * 0.5,
              useNativeDriver: true,
            }).start();
          });
        }
      });
    };

    // Start flickering
    intervalRef.current = setInterval(flicker, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [squares, flickerChance, maxOpacity]);

  return (
    <View style={[styles.container, { width, height }, style]}>
      {squares.map((square) => (
        <Animated.View
          key={square.id}
          style={[
            styles.square,
            {
              left: square.x,
              top: square.y,
              width: squareSize,
              height: squareSize,
              backgroundColor: color,
              opacity: square.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

// Demo component showing how to use it
export const FlickeringGridDemo: React.FC = () => {
  return (
    <View style={demoStyles.container}>
      <FlickeringGrid
        width={350}
        height={500}
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        style={demoStyles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  square: {
    position: 'absolute',
  },
});

const demoStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  grid: {
    borderRadius: 12,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#333',
  },
});