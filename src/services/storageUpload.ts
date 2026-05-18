export async function uploadPortfolioFile(
  _path: string,
  _file: File
): Promise<{ url?: string; error?: string }> {
  return {
    error: 'Upload direto removido. Use uma API/backend ou storage separado para arquivos.',
  };
}
