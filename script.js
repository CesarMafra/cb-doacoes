function multi() {
  var ValorUnitario = parseFloat(document.getElementById('ValorUnitario').value.replace(',', '.')) || 0;
  var Quantidade = parseFloat(document.getElementById('Quantidade').value) || 0;

  var result = ValorUnitario * Quantidade;
  document.getElementById('ValorTotal').value = formatarMoeda(result);
}

$(document).ready(function () {
  var table = $('#myTable').DataTable();
});

// Criação de novo item na lista de compras
function addProduct() {

  // Cria uma nova chave única para os dados
  const novaChave = database.ref('listaCompras').push().key;

  // Define os dados que serão adicionados
  const novoProduto = {
    Produto: document.getElementById('Produto').value,
    Marca: document.getElementById('Marca').value,
    Mercado: document.getElementById('Mercado').value,
    Quantidade: document.getElementById('Quantidade').value,
    ValorUnitario: document.getElementById('ValorUnitario').value,
    ProdutoObtido: document.getElementById('ProdutoObtido').value,
    ValorTotal: document.getElementById('ValorTotal').value,
  };

  // Salva os dados no caminho /novoProduto/NOVA_CHAVE
  return database.ref('listaCompras/' + novaChave).set(novoProduto);
}

// Referência ao caminho onde os dados estão armazenados
const listaComprasRef = database.ref('listaCompras');

// Escuta as mudanças em tempo real
listaComprasRef.on('value', (snapshot) => {
  const listaCompras = snapshot.val();

  // Verifica se há dados
  if (listaCompras) {
    // Itera sobre cada item na lista de compras
    Object.keys(listaCompras).forEach((chave) => {
      var table = $('#myTable').DataTable();

      ValorUnitario = formatarMoeda(listaCompras[chave].ValorUnitario)
      ValorTotal = formatarMoeda(listaCompras[chave].ValorTotal)

      console.log(listaCompras)

      ProdutoObtido = listaCompras[chave].ProdutoObtido

      if (ProdutoObtido == 'Sim') {
        switches = `<div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked>
                    </div>`
      } else {
        switches = `<div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    </div>`
      }

      // Adiciona uma nova linha
      table.row.add([
        listaCompras[chave].Produto,
        listaCompras[chave].Marca,
        listaCompras[chave].Mercado,
        listaCompras[chave].Quantidade,
        ValorUnitario,
        ValorTotal,
        switches,
      ]).draw();
    });
  } else {
    console.log("Nenhum dado encontrado na lista de compras.");
  }
});

// Variável para armazenar o valor total da compra
let totalCompra = 0;

// Escuta as mudanças em tempo real
listaComprasRef.on('value', (snapshot) => {
  const listaCompras = snapshot.val();

  // Zera o total da compra antes de calcular novamente
  totalCompra = 0;

  // Verifica se há dados
  if (listaCompras) {
    // Itera sobre cada item na lista de compras
    Object.keys(listaCompras).forEach((chave) => {
      const valorTotalProduto = parseFloat(listaCompras[chave].ValorTotal);

      // Adiciona o valor total do produto ao valor total da compra
      totalCompra += valorTotalProduto;
    });

    // Exibe o valor total da compra onde desejar
    document.getElementById('valorTotalCompra').innerHTML = formatarMoeda(totalCompra);
  } else {
    console.log("Nenhum dado encontrado na lista de compras.");
  }
});


function formatarParaMoeda(elemento) {
  // Obtém o valor digitado
  var valorDigitado = elemento.value;

  // Remove caracteres não numéricos
  valorDigitado = valorDigitado.replace(/\D/g, '');

  // Converte para número e formata como moeda brasileira
  var valorFormatado = Number(valorDigitado).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  // Atualiza o valor no campo de texto
  elemento.value = valorFormatado;
}

// Formtação R$
function formatarMoeda(valor) {
  // Verifica se o valor é numérico
  if (isNaN(valor)) {
    return '';
  }

  // Converte o valor para string
  valor = valor.toString();

  // Separa as partes inteira e decimal
  let partes = valor.split('.');
  let inteiro = partes[0];
  let decimal = partes.length > 1 ? partes[1] : '';

  // Formata a parte inteira com ponto como separador de milhar
  inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Retorna o valor formatado
  return 'R$ ' + inteiro + (decimal ? ',' + decimal : ',00');
}

function valorPlanejado() {

}

listaComprasRef.on('value', (snapshot) => {
  const listaCompras = snapshot.val();
  if (listaCompras) {
    var numeroDeCompras = Object.keys(listaCompras).length;
  } else {
    var numeroDeCompras = 0;
  }

  document.getElementById('itensPlanejados').innerHTML = numeroDeCompras
});

// Escuta as mudanças em tempo real
listaComprasRef.on('value', (snapshot) => {
  const listaCompras = snapshot.val();

  // Zera o total da compra antes de calcular novamente
  let totalItens = 0;

  // Verifica se há dados
  if (listaCompras) {
    // Itera sobre cada item na lista de compras
    Object.keys(listaCompras).forEach((chave) => {
      const produtoObtido = listaCompras[chave].ProdutoObtido;

      // Verifica se o produto foi obtido (contém a palavra "SIM")
      if (produtoObtido.includes("Sim")) {
        totalItens++;
      }
    });

    // Exibe o número total de produtos obtidos onde desejar
    document.getElementById('itensComprados').innerHTML = totalItens;
  } else {
    console.log("Nenhum dado encontrado na lista de compras.");
  }
});




function itensComprados() {

}