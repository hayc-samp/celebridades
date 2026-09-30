export async function PesquisarCelebridades(celebridade) {
  try {
    const token = '3RG6EX1rzYf4CYAmZDf0JGdrIzNbA7EFVEpMVPvY';
    
    // 1. Correção da URL (subdomínio correto e parâmetro ?name=)
    // 2. Adicionado o '$' antes de {encodeURIComponent(...)}
    const url = `https://api.api-ninjas.com/v1/celebrity?name=${encodeURIComponent(celebridade)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const dados = await response.json();
    console.log(dados);

    return dados;

  } catch (error) {
    console.error('Erro ao buscar celebridade:', error);
    throw error;
  }
}