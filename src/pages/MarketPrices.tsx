import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';

interface MarketPrice {
  commodity: string;
  variety: string;
  market: string;
  state: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  unit: string;
  date: string;
  trend?: 'up' | 'down' | 'stable';
}

// Sample data - In production, this would come from Agmarknet API or Data.gov.in
const sampleMarketData: MarketPrice[] = [
  {
    commodity: "Rice",
    variety: "Basmati",
    market: "Delhi (Azadpur)",
    state: "Delhi",
    min_price: 4500,
    max_price: 5200,
    modal_price: 4850,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "up"
  },
  {
    commodity: "Wheat",
    variety: "Lokwan",
    market: "Ahmedabad",
    state: "Gujarat",
    min_price: 2000,
    max_price: 2250,
    modal_price: 2125,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "stable"
  },
  {
    commodity: "Cotton",
    variety: "Medium Staple",
    market: "Guntur",
    state: "Andhra Pradesh",
    min_price: 6500,
    max_price: 7200,
    modal_price: 6850,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "down"
  },
  {
    commodity: "Onion",
    variety: "Red",
    market: "Nashik",
    state: "Maharashtra",
    min_price: 1500,
    max_price: 2000,
    modal_price: 1750,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "up"
  },
  {
    commodity: "Tomato",
    variety: "Hybrid",
    market: "Bangalore",
    state: "Karnataka",
    min_price: 800,
    max_price: 1200,
    modal_price: 1000,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "down"
  },
  {
    commodity: "Sugarcane",
    variety: "Common",
    market: "Lucknow",
    state: "Uttar Pradesh",
    min_price: 280,
    max_price: 310,
    modal_price: 295,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "stable"
  },
  {
    commodity: "Potato",
    variety: "Local",
    market: "Agra",
    state: "Uttar Pradesh",
    min_price: 900,
    max_price: 1300,
    modal_price: 1100,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "up"
  },
  {
    commodity: "Groundnut",
    variety: "Bold",
    market: "Rajkot",
    state: "Gujarat",
    min_price: 5000,
    max_price: 5800,
    modal_price: 5400,
    unit: "Quintal",
    date: "2025-01-15",
    trend: "stable"
  }
];

const fertilizers = [
  { name: "Urea", price: 266, unit: "50 kg bag", subsidy: "Yes" },
  { name: "DAP", price: 1350, unit: "50 kg bag", subsidy: "Yes" },
  { name: "MOP", price: 1700, unit: "50 kg bag", subsidy: "Yes" },
  { name: "NPK (10:26:26)", price: 1450, unit: "50 kg bag", subsidy: "Yes" }
];

const states = ["All States", "Delhi", "Gujarat", "Andhra Pradesh", "Maharashtra", "Karnataka", "Uttar Pradesh"];

export default function MarketPrices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [marketData, setMarketData] = useState<MarketPrice[]>(sampleMarketData);

  const filteredData = marketData.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.market.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'All States' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  const getTrendColor = (trend?: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-muted-foreground';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Market Prices & Mandi Rates
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real-time crop prices, fertilizer rates, and market trends across India
            </p>
          </div>

          <Tabs defaultValue="crops" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 mb-8">
              <TabsTrigger value="crops">Crop Prices</TabsTrigger>
              <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
            </TabsList>

            {/* Crops Tab */}
            <TabsContent value="crops" className="space-y-8">
              {/* Search & Filter */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by commodity, variety, or market..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Market Prices Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Mandi Rates</CardTitle>
                  <CardDescription>Latest commodity prices from major markets (All prices in ₹)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commodity</TableHead>
                          <TableHead>Variety</TableHead>
                          <TableHead>Market</TableHead>
                          <TableHead>State</TableHead>
                          <TableHead className="text-right">Min Price</TableHead>
                          <TableHead className="text-right">Max Price</TableHead>
                          <TableHead className="text-right">Modal Price</TableHead>
                          <TableHead className="text-center">Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.length > 0 ? (
                          filteredData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.commodity}</TableCell>
                              <TableCell>{item.variety}</TableCell>
                              <TableCell>{item.market}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">{item.state}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                ₹{item.min_price}/{item.unit}
                              </TableCell>
                              <TableCell className="text-right">
                                ₹{item.max_price}/{item.unit}
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                ₹{item.modal_price}/{item.unit}
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {getTrendIcon(item.trend)}
                                  <span className={`text-xs ${getTrendColor(item.trend)}`}>
                                    {item.trend || 'stable'}
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No data found matching your search criteria
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Data Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Official Data Sources</CardTitle>
                  <CardDescription>For latest and detailed market information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => window.open('https://agmarknet.gov.in', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Agmarknet - Market Prices
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => window.open('https://enam.gov.in', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      eNAM Portal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fertilizers Tab */}
            <TabsContent value="fertilizers" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Fertilizer Prices</CardTitle>
                  <CardDescription>Current retail prices of major fertilizers (Subsidized rates)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {fertilizers.map((fertilizer, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{fertilizer.name}</CardTitle>
                          <CardDescription>{fertilizer.unit}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-primary mb-2">
                            ₹{fertilizer.price}
                          </div>
                          <Badge variant="secondary">
                            {fertilizer.subsidy === "Yes" ? "Subsidized" : "Non-Subsidized"}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fertilizer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Fertilizer Subsidy Information</CardTitle>
                  <CardDescription>
                    Prices shown are subsidized rates. Actual prices may vary by state and district.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Urea: Essential nitrogen fertilizer for crop growth</p>
                    <p>• DAP (Di-ammonium Phosphate): Provides nitrogen and phosphorus</p>
                    <p>• MOP (Muriate of Potash): Potassium fertilizer for root development</p>
                    <p>• NPK: Balanced fertilizer containing nitrogen, phosphorus, and potassium</p>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://fert.1akal.in/', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Department of Fertilizers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer/>
    </Layout>
  );
}
