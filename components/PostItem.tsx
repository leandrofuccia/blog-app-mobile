import { theme } from '@/theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PostItemProps {
  titulo: string;
  autor: string;
  conteudo: string;
  onEdit?: () => void;
  onDelete?: () => void;
  loadingDelete?: boolean;
  showActions?: boolean;
}

export default function PostItem({
  titulo,
  autor,
  conteudo,
  onEdit,
  onDelete,
  loadingDelete = false,
  showActions = true,
}: PostItemProps) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.author}>Autor: {autor}</Text>
        <Text style={styles.author}>{conteudo}</Text>
      </View>

      {showActions && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
              <MaterialIcons name="edit" size={24} color={theme.colors.primaria} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              style={styles.iconButton}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <ActivityIndicator size={20} color={theme.colors.vermelho} />
              ) : (
                <MaterialIcons name="delete" size={24} color={theme.colors.vermelho} />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutroInput,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textoPrincipal,
  },
  author: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.textoSecundario,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});
