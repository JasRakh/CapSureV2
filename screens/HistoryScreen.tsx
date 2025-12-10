import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { getPillHistory } from '../utils/storage';
import { Pill } from '../types';

interface HistoryScreenProps {
  navigation: any;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [history, setHistory] = useState<Pill[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<Pill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = async () => {
    const pills = await getPillHistory();
    setHistory(pills);
    setFilteredHistory(pills);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(pill =>
        pill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  }, [searchQuery, history]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }: { item: Pill }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Result', { pill: item })}
      activeOpacity={0.7}
    >
      <Card style={styles.historyItem}>
        <View style={styles.historyItemHeader}>
          <Text
            style={[
              styles.pillName,
              {
                color: theme.colors.text,
              },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.timestamp,
              {
                color: theme.colors.textTertiary,
              },
            ]}
          >
            {formatDate(item.scannedAt)}
          </Text>
        </View>
        <Text
          style={[
            styles.pillDescription,
            {
              color: theme.colors.textSecondary,
            },
          ]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View
              key={index}
              style={[
                styles.tag,
                {
                  backgroundColor: theme.colors.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  {
                    color: theme.colors.text,
                  },
                ]}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: theme.colors.text,
            },
          ]}
          placeholder="Search by pill name..."
          placeholderTextColor={theme.colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text
            style={[
              styles.emptyText,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            {searchQuery ? 'No pills found' : 'No scan history yet'}
          </Text>
          {!searchQuery && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Scanner')}
              style={[
                styles.emptyButton,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <Text style={styles.emptyButtonText}>Scan your first pill</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  historyItem: {
    marginBottom: 12,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pillName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  pillDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

