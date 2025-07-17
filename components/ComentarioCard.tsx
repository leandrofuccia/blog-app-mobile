import { useAuth } from '@/context/AuthContext';
import { useCurtidaComentarioCount } from '@/hooks/useCurtidaComentarioCount';
import { useCurtidaComentarioStatus } from '@/hooks/useCurtidaComentarioStatus';
import { useExcluirCurtidaComentario } from '@/hooks/useExcluirCurtidaComentario';
import { useNovaCurtidaComentario } from '@/hooks/useNovaCurtidaComentario';
import { theme } from '@/theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ComentarioCardProps = {
  item: {
    id: number;
    nome_autor: string;
    conteudo: string;
    datacriacao: string;
    curtidasCount?: number; 
    postagem_titulo: string;
  };
};

export function ComentarioCard({ item }: ComentarioCardProps) {
  const { isLoggedIn } = useAuth();
  const { curtiu, loading: statusLoading, refresh: refreshStatus, setCurtiu } = useCurtidaComentarioStatus(item.id);
  const { count, loading: countLoading, refresh: refreshCount } = useCurtidaComentarioCount(item.id);
  const { novaCurtidaComentario, loading: novaCurtidaLoading } = useNovaCurtidaComentario(item.id);
  const { excluirCurtidaComentario, curtidaComentarioIdExcluida } = useExcluirCurtidaComentario(item.id);

  const handleLike = async () => {
    if (!isLoggedIn) {
      // Opcional: Navegar para a tela de login ou exibir um toast informando que precisa estar logado
      console.log('Usuário não logado, não pode curtir/descurtir.');
      return;
    }

    if (curtiu) {
      // Descurtir
      const success = await excluirCurtidaComentario(item.id);
      if (success) {
        setCurtiu(false);
        refreshCount(); // Atualiza a contagem de curtidas
      }
    } else {
      // Curtir
      const success = await novaCurtidaComentario(item.id);
      if (success) {
        setCurtiu(true);
        refreshCount(); // Atualiza a contagem de curtidas
      }
    }
  };

  const isLoading = statusLoading || countLoading || novaCurtidaLoading;

  return (
    <View style={styles.commentCard}>
      <Text style={styles.commentTituloPostagem}>{item.postagem_titulo}</Text>
      <Text style={styles.commentAuthor}>{item.nome_autor}</Text>
      <Text style={styles.commentContent}>{item.conteudo}</Text>
      <View style={styles.footerContainer}>
        <Text style={styles.commentDate}>
          {new Date(item.datacriacao).toLocaleDateString('pt-BR')}
        </Text>
        {isLoggedIn && (
          <TouchableOpacity
            onPress={handleLike}
            style={styles.likeButton}
            disabled={isLoading} // Desabilita o botão enquanto as requisições estão em andamento
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={theme.colors.primaria} />
            ) : (
              <>
                <MaterialIcons
                  name={curtiu ? "favorite" : "favorite-border"}
                  size={20}
                  color={curtiu ? theme.colors.primaria : theme.colors.textoSecundario}
                />
                <Text style={styles.likeCount}>{count}</Text>
              </>
            )}
          </TouchableOpacity>
        )}
        {!isLoggedIn && ( // Exibe apenas a contagem se não estiver logado
          <View style={styles.likeButton}>
            <MaterialIcons
              name="favorite-border"
              size={20}
              color={theme.colors.textoSecundario}
            />
            <Text style={styles.likeCount}>{count}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentCard: {
    backgroundColor: theme.colors.neutroInput,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
  },
  commentAuthor: {
    ...theme.fonts.label,
    color: theme.colors.primaria,
  },
  commentContent: {
    ...theme.fonts.body,
    marginTop: 4,
    color: theme.colors.textoPrincipal,
  },

  commentTituloPostagem: {
    ...theme.fonts.body,
    marginTop: 4,
    color: theme.colors.primaria,
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  commentDate: {
    ...theme.fonts.label,
    fontSize: 12,
    color: theme.colors.textoSecundario,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  likeCount: {
    ...theme.fonts.label,
    fontSize: 14,
    marginLeft: 4,
    color: theme.colors.textoSecundario,
  },
});