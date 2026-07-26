export type ChartRange = '1M' | '6M' | '1A';

const PATRIMONIO_SERIES: Record<ChartRange, number[]> = {
  '1M': [92, 94, 91, 96, 98, 97, 101, 104, 103, 108, 110, 112],
  '6M': [78, 84, 90, 88, 95, 112],
  '1A': [60, 68, 72, 80, 75, 90, 88, 96, 100, 104, 108, 112],
};

export function buildChartPaths(range: ChartRange): { linePath: string; areaPath: string } {
  const series = PATRIMONIO_SERIES[range];
  const w = 560;
  const h = 180;
  const pad = 8;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const points = series.map((value, i) => {
    const x = pad + (i / (series.length - 1)) * (w - pad * 2);
    const y = h - pad - ((value - min) / span) * (h - pad * 2);
    return [x, y] as const;
  });
  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
  const first = points[0]!;
  const last = points[points.length - 1]!;
  const areaPath = `${linePath} L${last[0].toFixed(1)} ${h - pad} L${first[0].toFixed(1)} ${h - pad} Z`;
  return { linePath, areaPath };
}

export interface MarketIndicator {
  label: string;
  value: string;
  change: string;
}

export const marketIndicators: MarketIndicator[] = [
  { label: 'IBOVESPA', value: '132.480', change: '+0,6%' },
  { label: 'DÓLAR', value: 'R$ 5,42', change: '-0,2%' },
  { label: 'CDI', value: '10,75%', change: '0,0%' },
];

export interface Holding {
  ticker: string;
  qty: number;
  value: string;
  change: string;
  isPositive: boolean;
}

export const topHoldings: Holding[] = [
  { ticker: 'PETR4', qty: 200, value: 'R$ 6.840,00', change: '+2,4%', isPositive: true },
  { ticker: 'VALE3', qty: 120, value: 'R$ 8.112,00', change: '-1,1%', isPositive: false },
  { ticker: 'ITUB4', qty: 300, value: 'R$ 9.870,00', change: '+0,8%', isPositive: true },
  { ticker: 'WEGE3', qty: 150, value: 'R$ 6.315,00', change: '+3,2%', isPositive: true },
  { ticker: 'BBAS3', qty: 180, value: 'R$ 5.004,00', change: '-0,5%', isPositive: false },
];

export interface MarketMover {
  ticker: string;
  name: string;
  change: string;
}

export const gainers: MarketMover[] = [
  { ticker: 'WEGE3', name: 'WEG', change: '+5,8%' },
  { ticker: 'RENT3', name: 'Localiza', change: '+4,3%' },
  { ticker: 'SUZB3', name: 'Suzano', change: '+3,9%' },
  { ticker: 'EQTL3', name: 'Equatorial', change: '+3,1%' },
  { ticker: 'RADL3', name: 'RaiaDrogasil', change: '+2,6%' },
  { ticker: 'TOTS3', name: 'Totvs', change: '+2,2%' },
];

export const losers: MarketMover[] = [
  { ticker: 'CSNA3', name: 'CSN', change: '-4,7%' },
  { ticker: 'GOAU4', name: 'Gerdau', change: '-3,9%' },
  { ticker: 'MGLU3', name: 'Magazine Luiza', change: '-3,2%' },
  { ticker: 'AZUL4', name: 'Azul', change: '-2,8%' },
  { ticker: 'COGN3', name: 'Cogna', change: '-2,1%' },
  { ticker: 'CVCB3', name: 'CVC', change: '-1,8%' },
];

export interface NewsItem {
  title: string;
  source: string;
  time: string;
}

export const news: NewsItem[] = [
  {
    title: 'Petrobras anuncia novo plano de investimentos para o pré-sal',
    source: 'InfoMoney',
    time: '2h',
  },
  { title: 'Selic mantida em 10,75% pelo Copom', source: 'Valor Econômico', time: '4h' },
  { title: 'Vale reporta produção recorde de minério no trimestre', source: 'Estadão', time: '6h' },
  { title: 'Ibovespa fecha em alta puxado por bancos', source: 'InfoMoney', time: '8h' },
  { title: 'Dólar recua com dados de emprego nos EUA', source: 'Reuters', time: '10h' },
  { title: 'WEG anuncia expansão da fábrica no Ceará', source: 'Valor Econômico', time: '1d' },
];

export interface PortfolioRow {
  ticker: string;
  name: string;
  qty: number;
  avgPrice: string;
  currentPrice: string;
  total: string;
  pl: string;
  isPositive: boolean;
}

export const portfolio: PortfolioRow[] = [
  {
    ticker: 'PETR4',
    name: 'Petrobras PN',
    qty: 200,
    avgPrice: 'R$ 32,10',
    currentPrice: 'R$ 34,20',
    total: 'R$ 6.840,00',
    pl: '+2,4%',
    isPositive: true,
  },
  {
    ticker: 'VALE3',
    name: 'Vale ON',
    qty: 120,
    avgPrice: 'R$ 69,50',
    currentPrice: 'R$ 67,60',
    total: 'R$ 8.112,00',
    pl: '-1,1%',
    isPositive: false,
  },
  {
    ticker: 'ITUB4',
    name: 'Itaú Unibanco PN',
    qty: 300,
    avgPrice: 'R$ 31,80',
    currentPrice: 'R$ 32,90',
    total: 'R$ 9.870,00',
    pl: '+0,8%',
    isPositive: true,
  },
  {
    ticker: 'WEGE3',
    name: 'WEG ON',
    qty: 150,
    avgPrice: 'R$ 40,20',
    currentPrice: 'R$ 42,10',
    total: 'R$ 6.315,00',
    pl: '+3,2%',
    isPositive: true,
  },
  {
    ticker: 'BBAS3',
    name: 'Banco do Brasil ON',
    qty: 180,
    avgPrice: 'R$ 27,90',
    currentPrice: 'R$ 27,80',
    total: 'R$ 5.004,00',
    pl: '-0,5%',
    isPositive: false,
  },
  {
    ticker: 'BBSE3',
    name: 'BB Seguridade ON',
    qty: 220,
    avgPrice: 'R$ 33,40',
    currentPrice: 'R$ 35,10',
    total: 'R$ 7.722,00',
    pl: '+5,1%',
    isPositive: true,
  },
];

export interface ChatMessage {
  from: 'user' | 'ai';
  text: string;
}

export const chatMessages: ChatMessage[] = [
  { from: 'user', text: 'Como está o desempenho da minha carteira este mês?' },
  {
    from: 'ai',
    text: 'Sua carteira valorizou 8,4% nos últimos 30 dias, puxada principalmente por WEGE3 (+3,2%) e BBSE3 (+5,1%). VALE3 e BBAS3 tiveram leve queda no período.',
  },
  { from: 'user', text: 'O que é "preço médio" de uma ação?' },
  {
    from: 'ai',
    text: 'É o valor médio pago por cada unidade de um ativo, considerando todas as compras já feitas. Ele serve de referência para calcular seu lucro ou prejuízo em relação ao preço atual.',
  },
];

export const patrimonioTotal = 'R$ 43.863,00';
export const patrimonioVariacao = '+8,4%';
