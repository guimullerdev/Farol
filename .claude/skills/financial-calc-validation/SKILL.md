---
name: financial-calc-validation
description: Valida e testa qualquer cálculo financeiro do app (preço médio, lucro/prejuízo, yield on cost, imposto de renda sobre ganho de capital). Use esta skill sempre que escrever, revisar ou alterar código que calcule preço médio de ativos, P&L realizado ou não realizado, proventos, yield, ou apuração de IR — mesmo que o pedido não mencione explicitamente "cálculo financeiro" ou "testes". Use também ao adicionar suporte a eventos como desdobramento (split), bonificação, ou grupamento de ativos.
---

# Validação de Cálculos Financeiros

Cálculo financeiro errado no app não é bug cosmético — é gerar um número que o usuário vai usar pra decisão real ou pra declaração de IR. Trate todo código dessa categoria com o mesmo rigor de código de pagamento.

## Regra de ouro: nunca usar float puro

Valores monetários devem ser representados como:
- Inteiros em centavos (ex: R$ 10,50 = `1050`), ou
- `decimal.js` / `big.js` para operações que exigem casas decimais

`0.1 + 0.2 !== 0.3` em JS puro — isso é inaceitável em cálculo de carteira.

## Fórmulas de referência

**Preço médio (average cost)** — recalculado a cada compra, mantido em vendas:

```
novo_preco_medio = (qtd_atual * preco_medio_atual + qtd_comprada * preco_compra) / (qtd_atual + qtd_comprada)
```

Vendas NÃO alteram o preço médio, só reduzem a quantidade.

**Lucro/prejuízo realizado** (na venda):

```
resultado = (preco_venda - preco_medio) * qtd_vendida - custos_operacionais
```

**Yield on cost** (diferente do dividend yield comum, que usa preço atual — não confundir os dois na UI):

```
yield_on_cost = proventos_recebidos_12m / (preco_medio * qtd_atual)
```

**Ganho de capital para IR (mercado brasileiro)**:
- Ações: isenção de IR sobre vendas até R$ 20.000/mês (soma de todas as vendas de ações no mês, não por ativo). Acima disso, 15% sobre o lucro do mês inteiro.
- FIIs: SEM isenção — 20% sobre qualquer lucro, independente do valor vendido no mês.
- Day trade tem alíquota e regra de isenção diferentes (20%, sem isenção) — trate como categoria separada se o app for suportar.

## Casos de borda obrigatórios (sempre testar)

Ao escrever ou revisar qualquer função de cálculo, garanta testes unitários cobrindo:

1. Compra única, depois venda parcial (preço médio não muda)
2. Múltiplas compras em preços diferentes (preço médio pondera corretamente)
3. Venda total seguida de nova compra (preço médio reinicia do zero, não herda o antigo)
4. Desdobramento (split) — quantidade multiplica, preço médio divide, proporcionalmente
5. Bonificação — nova quantidade entra a custo zero (ou custo informado), diluindo o preço médio
6. Venda no mês que ultrapassa R$20.000 em ações (isenção deixa de valer pro mês inteiro, não só pro excedente)
7. Arredondamento — quantidades fracionárias de ações (mercado fracionário) e cotas inteiras de FII
8. Proventos reinvestidos automaticamente — decida explicitamente se contam como nova "compra" pra fins de custo, e documente essa decisão no código

## Checklist antes de abrir PR com cálculo financeiro

- [ ] Nenhum valor monetário usando `number`/float sem passar por `decimal.js` ou centavos inteiros
- [ ] Teste cobrindo pelo menos os casos de borda 1–3 acima
- [ ] Se envolve IR: teste de limite exato (R$ 20.000,00 e R$ 20.000,01)
- [ ] Resultado comparado manualmente contra uma calculadora ou planilha de referência — não só contra o próprio teste escrito para o código
- [ ] Nenhum log/print de debug com dado de carteira real esquecido no código

## Quando pedir confirmação ao usuário

Se a regra de negócio for ambígua (ex: como tratar proventos reinvestidos, operações no exterior, day trade vs swing trade), não assuma — pergunte antes de implementar. Uma regra de cálculo financeiro errada e silenciosa é pior do que parar pra perguntar.
