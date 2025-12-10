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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { getPillHistory, clearPillHistory } from '../utils/storage';
import { Pill } from '../types';
import { Alert } from 'react-native';

interface HistoryScreenProps {
  navigation: any;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
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
      const filtered = history.filter((pill) =>
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

  const handleClearHistory = async () => {
    Alert.alert(t('history.clearHistory'), t('history.clearConfirm'), [
      {
        text: t('history.no'),
        style: 'cancel',
      },
      {
        text: t('history.yes'),
        style: 'destructive',
        onPress: async () => {
          await clearPillHistory();
          await loadHistory();
        },
      },
    ]);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t('time.justNow');
    if (minutes < 60) return t('time.minutesAgo', { count: minutes });
    if (hours < 24) return t('time.hoursAgo', { count: hours });
    if (days < 7) return t('time.daysAgo', { count: days });
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <View style={styles.headerContainer}>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Ionicons
            name='search-outline'
            size={20}
            color={theme.colors.textTertiary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              {
                color: theme.colors.text,
              },
            ]}
            placeholder={t('history.searchPlaceholder')}
            placeholderTextColor={theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {filteredHistory.length > 0 && (
          <TouchableOpacity
            style={[
              styles.clearButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={handleClearHistory}
            activeOpacity={0.7}
          >
            <Ionicons name='trash-outline' size={18} color={theme.colors.error || '#FF3B30'} />
            <Text
              style={[
                styles.clearButtonText,
                {
                  color: theme.colors.error || '#FF3B30',
                },
              ]}
            >
              {t('history.clearHistory')}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View
            style={[
              styles.emptyIconContainer,
              {
                backgroundColor: `${theme.colors.primary}15`,
              },
            ]}
          >
            <Ionicons
              name={searchQuery ? 'search-outline' : 'list-outline'}
              size={48}
              color={theme.colors.primary}
            />
          </View>
          <Text
            style={[
              styles.emptyText,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            {t('history.emptyTitle')}
          </Text>
          <Text
            style={[
              styles.emptyDescription,
              {
                color: theme.colors.textTertiary,
              },
            ]}
          >
            {!searchQuery && t('history.emptyDescription')}
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
              activeOpacity={0.8}
            >
              <Ionicons name='camera-outline' size={18} color='#FFFFFF' />
              <Text style={styles.emptyButtonText}>{t('history.scanFirst')}</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
