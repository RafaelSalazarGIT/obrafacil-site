'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Bar, 
  Line, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts'

// Tipos para dados de análise
export interface SalesData {
  date: string
  revenue: number
  orders: number
}

export interface ProductPerformance {
  id: string
  name: string
  sales: number
  revenue: number
  views: number
  conversionRate: number
}

export interface UserActivity {
  date: string
  newUsers: number
  activeUsers: number
  courseCompletions: number
}

export interface CategoryPerformance {
  name: string
  value: number
  color: string
}

export default function AnalyticsService() {
  // Dados simulados para demonstração
  const generateMockSalesData = (days: number): SalesData[] => {
    const data: SalesData[] = []
    const now = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      // Gerar valores aleatórios com tendência de crescimento
      const baseRevenue = 500 + Math.random() * 500
      const growthFactor = 1 + (days - i) / (days * 2)
      const revenue = Math.round(baseRevenue * growthFactor * 100) / 100
      const orders = Math.round(revenue / 250)
      
      data.push({
        date: date.toISOString().split('T')[0],
        revenue,
        orders
      })
    }
    
    return data
  }
  
  const generateMockProductPerformance = (): ProductPerformance[] => {
    const products = [
      { id: 'prod-1', name: 'Orçamento Completo de Obras' },
      { id: 'prod-2', name: 'Planilha de Gestão de Projetos' },
      { id: 'prod-3', name: 'Cálculo Estrutural Simplificado' },
      { id: 'prod-4', name: 'Planilha de Cronograma Físico-Financeiro' },
      { id: 'prod-5', name: 'Dimensionamento Hidráulico' }
    ]
    
    return products.map(product => {
      const sales = Math.floor(Math.random() * 50) + 10
      const avgPrice = Math.floor(Math.random() * 100) + 150
      const revenue = sales * avgPrice
      const views = sales * (Math.floor(Math.random() * 10) + 5)
      const conversionRate = Math.round((sales / views) * 100 * 10) / 10
      
      return {
        id: product.id,
        name: product.name,
        sales,
        revenue,
        views,
        conversionRate
      }
    }).sort((a, b) => b.revenue - a.revenue)
  }
  
  const generateMockUserActivity = (days: number): UserActivity[] => {
    const data: UserActivity[] = []
    const now = new Date()
    
    let cumulativeUsers = 50 // Começar com base de usuários
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      // Gerar valores com tendência de crescimento
      const newUsers = Math.floor(Math.random() * 10) + 1
      cumulativeUsers += newUsers
      const activeUsers = Math.floor(cumulativeUsers * (0.3 + Math.random() * 0.3))
      const courseCompletions = Math.floor(activeUsers * (0.05 + Math.random() * 0.1))
      
      data.push({
        date: date.toISOString().split('T')[0],
        newUsers,
        activeUsers,
        courseCompletions
      })
    }
    
    return data
  }
  
  const generateMockCategoryPerformance = (): CategoryPerformance[] => {
    const categories = [
      { name: 'Orçamentos', color: '#8884d8' },
      { name: 'Estrutural', color: '#82ca9d' },
      { name: 'Gestão', color: '#ffc658' },
      { name: 'Hidráulica', color: '#ff8042' },
      { name: 'Elétrica', color: '#0088fe' }
    ]
    
    return categories.map(category => ({
      name: category.name,
      value: Math.floor(Math.random() * 5000) + 1000,
      color: category.color
    })).sort((a, b) => b.value - a.value)
  }
  
  // Estados para armazenar dados
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [productPerformance, setProductPerformance] = useState<ProductPerformance[]>([])
  const [userActivity, setUserActivity] = useState<UserActivity[]>([])
  const [categoryPerformance, setCategoryPerformance] = useState<CategoryPerformance[]>([])
  
  // Carregar dados simulados
  useEffect(() => {
    setSalesData(generateMockSalesData(30))
    setProductPerformance(generateMockProductPerformance())
    setUserActivity(generateMockUserActivity(30))
    setCategoryPerformance(generateMockCategoryPerformance())
  }, [])
  
  // Calcular métricas resumidas
  const calculateSummaryMetrics = () => {
    if (!salesData.length) return null
    
    const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0)
    const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0)
    const averageOrderValue = totalRevenue / totalOrders
    
    // Calcular crescimento comparando com período anterior
    const midpoint = Math.floor(salesData.length / 2)
    const recentRevenue = salesData.slice(midpoint).reduce((sum, day) => sum + day.revenue, 0)
    const previousRevenue = salesData.slice(0, midpoint).reduce((sum, day) => sum + day.revenue, 0)
    const revenueGrowth = ((recentRevenue - previousRevenue) / previousRevenue) * 100
    
    const recentOrders = salesData.slice(midpoint).reduce((sum, day) => sum + day.orders, 0)
    const previousOrders = salesData.slice(0, midpoint).reduce((sum, day) => sum + day.orders, 0)
    const ordersGrowth = ((recentOrders - previousOrders) / previousOrders) * 100
    
    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      revenueGrowth,
      ordersGrowth
    }
  }
  
  // Calcular métricas de usuários
  const calculateUserMetrics = () => {
    if (!userActivity.length) return null
    
    const totalNewUsers = userActivity.reduce((sum, day) => sum + day.newUsers, 0)
    const totalCourseCompletions = userActivity.reduce((sum, day) => sum + day.courseCompletions, 0)
    const averageActiveUsers = Math.round(
      userActivity.reduce((sum, day) => sum + day.activeUsers, 0) / userActivity.length
    )
    
    // Calcular crescimento
    const midpoint = Math.floor(userActivity.length / 2)
    const recentNewUsers = userActivity.slice(midpoint).reduce((sum, day) => sum + day.newUsers, 0)
    const previousNewUsers = userActivity.slice(0, midpoint).reduce((sum, day) => sum + day.newUsers, 0)
    const userGrowth = ((recentNewUsers - previousNewUsers) / previousNewUsers) * 100
    
    return {
      totalNewUsers,
      totalCourseCompletions,
      averageActiveUsers,
      userGrowth
    }
  }
  
  // Componentes de visualização
  
  // Gráfico de vendas
  const SalesChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={salesData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          name="Receita (R$)"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="orders"
          stroke="#82ca9d"
          name="Pedidos"
        />
      </LineChart>
    </ResponsiveContainer>
  )
  
  // Gráfico de desempenho de produtos
  const ProductPerformanceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={productPerformance}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" name="Receita (R$)" fill="#8884d8" />
        <Bar dataKey="sales" name="Vendas" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
  
  // Gráfico de atividade de usuários
  const UserActivityChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={userActivity}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="activeUsers"
          stroke="#8884d8"
          name="Usuários Ativos"
        />
        <Line
          type="monotone"
          dataKey="newUsers"
          stroke="#82ca9d"
          name="Novos Usuários"
        />
        <Line
          type="monotone"
          dataKey="courseCompletions"
          stroke="#ffc658"
          name="Conclusões de Cursos"
        />
      </LineChart>
    </ResponsiveContainer>
  )
  
  // Gráfico de desempenho por categoria
  const CategoryPerformanceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryPerformance}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {categoryPerformance.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
  
  // Gerar relatório em CSV
  const generateCSVReport = (data: any[], filename: string) => {
    if (!data.length) return null
    
    // Obter cabeçalhos das colunas
    const headers = Object.keys(data[0])
    
    // Criar linhas de dados
    const csvRows = [
      headers.join(','), // Cabeçalho
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          // Formatar valores para CSV
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value
        }).join(',')
      )
    ]
    
    // Criar blob e link para download
    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return {
    // Dados
    salesData,
    productPerformance,
    userActivity,
    categoryPerformance,
    
    // Métricas calculadas
    summaryMetrics: calculateSummaryMetrics(),
    userMetrics: calculateUserMetrics(),
    
    // Componentes de visualização
    SalesChart,
    ProductPerformanceChart,
    UserActivityChart,
    CategoryPerformanceChart,
    
    // Funções de relatório
    generateCSVReport,
    
    // Funções para atualizar dados (em um ambiente real, estas funções buscariam dados da API)
    refreshSalesData: (days: number = 30) => setSalesData(generateMockSalesData(days)),
    refreshProductPerformance: () => setProductPerformance(generateMockProductPerformance()),
    refreshUserActivity: (days: number = 30) => setUserActivity(generateMockUserActivity(days)),
    refreshCategoryPerformance: () => setCategoryPerformance(generateMockCategoryPerformance())
  }
}
