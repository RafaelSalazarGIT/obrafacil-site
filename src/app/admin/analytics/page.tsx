'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Download,
  Calendar
} from 'lucide-react'
import AnalyticsService from '@/components/analytics/AnalyticsService'

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const analytics = AnalyticsService()
  
  // Converter timeRange para dias
  const getDays = () => {
    switch (timeRange) {
      case '7d': return 7
      case '30d': return 30
      case '90d': return 90
      default: return 30
    }
  }
  
  // Atualizar dados ao mudar período
  const handleTimeRangeChange = (value: '7d' | '30d' | '90d') => {
    setTimeRange(value)
    analytics.refreshSalesData(getDays())
    analytics.refreshUserActivity(getDays())
  }
  
  // Exportar relatórios
  const exportSalesReport = () => {
    analytics.generateCSVReport(analytics.salesData, `vendas_${timeRange}_${new Date().toISOString().split('T')[0]}`)
  }
  
  const exportProductsReport = () => {
    analytics.generateCSVReport(analytics.productPerformance, `produtos_${new Date().toISOString().split('T')[0]}`)
  }
  
  const exportUsersReport = () => {
    analytics.generateCSVReport(analytics.userActivity, `usuarios_${timeRange}_${new Date().toISOString().split('T')[0]}`)
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Análises e Relatórios</h1>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Período:</span>
          <div className="border rounded-md overflow-hidden">
            <button 
              className={`px-3 py-1 text-sm ${timeRange === '7d' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}`}
              onClick={() => handleTimeRangeChange('7d')}
            >
              7 dias
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeRange === '30d' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}`}
              onClick={() => handleTimeRangeChange('30d')}
            >
              30 dias
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeRange === '90d' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}`}
              onClick={() => handleTimeRangeChange('90d')}
            >
              90 dias
            </button>
          </div>
        </div>
      </div>
      
      {/* Cards de métricas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Receita Total</p>
                <h3 className="text-2xl font-bold mt-1">
                  R$ {analytics.summaryMetrics?.totalRevenue.toFixed(2) || '0.00'}
                </h3>
                <p className={`text-xs mt-1 ${analytics.summaryMetrics?.revenueGrowth && analytics.summaryMetrics.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.summaryMetrics?.revenueGrowth && analytics.summaryMetrics.revenueGrowth > 0 ? '↑' : '↓'} 
                  {Math.abs(analytics.summaryMetrics?.revenueGrowth || 0).toFixed(1)}% vs. período anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pedidos</p>
                <h3 className="text-2xl font-bold mt-1">
                  {analytics.summaryMetrics?.totalOrders || 0}
                </h3>
                <p className={`text-xs mt-1 ${analytics.summaryMetrics?.ordersGrowth && analytics.summaryMetrics.ordersGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.summaryMetrics?.ordersGrowth && analytics.summaryMetrics.ordersGrowth > 0 ? '↑' : '↓'} 
                  {Math.abs(analytics.summaryMetrics?.ordersGrowth || 0).toFixed(1)}% vs. período anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Novos Usuários</p>
                <h3 className="text-2xl font-bold mt-1">
                  {analytics.userMetrics?.totalNewUsers || 0}
                </h3>
                <p className={`text-xs mt-1 ${analytics.userMetrics?.userGrowth && analytics.userMetrics.userGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.userMetrics?.userGrowth && analytics.userMetrics.userGrowth > 0 ? '↑' : '↓'} 
                  {Math.abs(analytics.userMetrics?.userGrowth || 0).toFixed(1)}% vs. período anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
                <h3 className="text-2xl font-bold mt-1">
                  R$ {analytics.summaryMetrics?.averageOrderValue.toFixed(2) || '0.00'}
                </h3>
                <p className="text-xs mt-1 text-gray-500">
                  Por pedido
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            <span>Vendas</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Produtos</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            <span>Categorias</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Vendas e Pedidos</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportSalesReport}
                className="h-8 flex items-center"
              >
                <Download className="h-4 w-4 mr-1" />
                Exportar CSV
              </Button>
            </CardHeader>
            <CardContent>
              <analytics.SalesChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Desempenho de Produtos</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportProductsReport}
                className="h-8 flex items-center"
              >
                <Download className="h-4 w-4 mr-1" />
                Exportar CSV
              </Button>
            </CardHeader>
            <CardContent>
              <analytics.ProductPerformanceChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Produto</th>
                      <th className="text-right py-3 px-4">Vendas</th>
                      <th className="text-right py-3 px-4">Receita</th>
                      <th className="text-right py-3 px-4">Visualizações</th>
                      <th className="text-right py-3 px-4">Taxa de Conversão</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.productPerformance.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="text-right py-3 px-4">{product.sales}</td>
                        <td className="text-right py-3 px-4">R$ {product.revenue.toFixed(2)}</td>
                        <td className="text-right py-3 px-4">{product.views}</td>
                        <td className="text-right py-3 px-4">{product.conversionRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Atividade de Usuários</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportUsersReport}
                className="h-8 flex items-center"
              >
                <Download className="h-4 w-4 mr-1" />
                Exportar CSV
              </Button>
            </CardHeader>
            <CardContent>
              <analytics.UserActivityChart />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Usuários Ativos</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {analytics.userMetrics?.averageActiveUsers || 0}
                  </h3>
                  <p className="text-xs mt-1 text-gray-500">
                    Média diária
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Cursos Concluídos</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {analytics.userMetrics?.totalCourseCompletions || 0}
                  </h3>
                  <p className="text-xs mt-1 text-gray-500">
                    No período
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Taxa de Crescimento</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {analytics.userMetrics?.userGrowth.toFixed(1) || 0}%
                  </h3>
                  <p className="text-xs mt-1 text-gray-500">
                    Novos usuários
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <analytics.CategoryPerformanceChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Categoria</th>
                      <th className="text-right py-3 px-4">Receita</th>
                      <th className="text-right py-3 px-4">% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.categoryPerformance.map((category) => {
                      const totalValue = analytics.categoryPerformance.reduce((sum, cat) => sum + cat.value, 0)
                      const percentage = (category.value / totalValue) * 100
                      
                      return (
                        <tr key={category.name} className="border-b">
                          <td className="py-3 px-4 flex items-center">
                            <span 
                              className="h-3 w-3 rounded-full mr-2" 
                              style={{ backgroundColor: category.color }}
                            ></span>
                            {category.name}
                          </td>
                          <td className="text-right py-3 px-4">R$ {category.value.toFixed(2)}</td>
                          <td className="text-right py-3 px-4">{percentage.toFixed(1)}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
