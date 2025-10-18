import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { TestTube, Droplets, Leaf, Activity } from 'lucide-react';
import Footer from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot';
import { Bot } from 'lucide-react';

const SoilCheck: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        location: '',
        farm_area_acres: '',
        primary_crop: '',
        soil_type: '',
        ph_level: '',
        nitrogen_level: '',
        phosphorus_level: '',
        potassium_level: '',
        organic_matter_percent: '',
        moisture_percent: '',
        sample_count: '',
        contact_phone: '',
        notes: ''
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            toast({
                title: 'Authentication Required',
                description: 'Please sign in to submit a soil check request',
                variant: 'destructive'
            });
            navigate('/auth');
            return;
        }

        setIsSubmitting(true);

        const { error } = await supabase
            .from('soil_checks')
            .insert({
                user_id: user.id,
                location: formData.location,
                // Ensure number fields are parsed correctly
                farm_area_acres: formData.farm_area_acres ? parseFloat(formData.farm_area_acres) : null,
                primary_crop: formData.primary_crop || null,
                soil_type: formData.soil_type || null,
                ph_level: formData.ph_level ? parseFloat(formData.ph_level) : null,
                nitrogen_level: formData.nitrogen_level || null,
                phosphorus_level: formData.phosphorus_level || null,
                potassium_level: formData.potassium_level || null,
                organic_matter_percent: formData.organic_matter_percent ? parseFloat(formData.organic_matter_percent) : null,
                moisture_percent: formData.moisture_percent ? parseFloat(formData.moisture_percent) : null,
                sample_count: formData.sample_count ? parseInt(formData.sample_count) : null,
                contact_phone: formData.contact_phone || null,
                notes: formData.notes || null,
                status: 'pending' // Initial status is pending review by admin
            });

        setIsSubmitting(false);

        if (error) {
            console.error('Error submitting soil check:', error);
            toast({
                title: 'Submission Failed',
                description: 'Failed to submit soil check request: ' + error.message,
                variant: 'destructive'
            });
            return;
        }

        toast({
            title: 'Request Submitted',
            description: 'Your soil analysis request has been submitted successfully. It is now visible to the Admin for review.'
        });

        // Reset form
        setFormData({
            location: '',
            farm_area_acres: '',
            primary_crop: '',
            soil_type: '',
            ph_level: '',
            nitrogen_level: '',
            phosphorus_level: '',
            potassium_level: '',
            organic_matter_percent: '',
            moisture_percent: '',
            sample_count: '',
            contact_phone: '',
            notes: ''
        });
    };

    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <Layout>


            <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
                  
                        {/* ⭐️ RE-ADD FLOATING BUTTON LOGIC HERE ⭐️ */}
                              {!isChatOpen && (
                                  <Button
                                      onClick={() => setIsChatOpen(true)}
                                      className="fixed bottom-8 right-8 flex items-center justify-center gap-3 rounded-full shadow-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 z-50 px-7 py-7"
                                  >
                                      <Bot className="text-white" style={{ width: '30px', height: '30px' }} />
                                      <span className="text-white font-semibold text-2xl">AI</span>
                                  </Button>
                              )}


            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <TestTube className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{t('soil.title')}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('soil.subtitle')}
                    </p>
                </div>

                {/* Features Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card>
                        <CardHeader>
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                                <Droplets className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">Comprehensive Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Get detailed insights on pH, NPK levels, moisture, and organic matter content
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                                <Leaf className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">Crop Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Receive tailored crop suggestions based on your soil composition
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                                <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">Expert Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Our agricultural experts will review and provide personalized recommendations
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Soil Check Form */}
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Request Soil Analysis</CardTitle>
                        <CardDescription>
                            Fill in the details below to request a comprehensive soil analysis for your farm
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Farm Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Farm Information</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="location">{t('soil.location')} *</Label>
                                        <Input
                                            id="location"
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="e.g., Punjab, Ludhiana"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farm_area">Farm Area (Acres)</Label>
                                        <Input
                                            id="farm_area"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.farm_area_acres}
                                            onChange={(e) => setFormData({ ...formData, farm_area_acres: e.target.value })}
                                            placeholder="e.g., 5.5"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="primary_crop">{t('soil.cropType')}</Label>
                                        <Input
                                            id="primary_crop"
                                            value={formData.primary_crop}
                                            onChange={(e) => setFormData({ ...formData, primary_crop: e.target.value })}
                                            placeholder="e.g., Wheat, Rice, Cotton"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="soil_type">{t('soil.soilType')}</Label>
                                        <Select value={formData.soil_type} onValueChange={(value) => setFormData({ ...formData, soil_type: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select soil type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clay">Clay</SelectItem>
                                                <SelectItem value="sandy">Sandy</SelectItem>
                                                <SelectItem value="loamy">Loamy</SelectItem>
                                                <SelectItem value="silty">Silty</SelectItem>
                                                <SelectItem value="peaty">Peaty</SelectItem>
                                                <SelectItem value="chalky">Chalky</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Soil Parameters */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Soil Parameters (Optional)</h3>
                                <p className="text-sm text-muted-foreground">If you have existing test results, you can provide them here</p>
                                
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ph_level">{t('soil.ph')}</Label>
                                        <Input
                                            id="ph_level"
                                            type="number"
                                            min="0"
                                            max="14"
                                            step="0.1"
                                            value={formData.ph_level}
                                            onChange={(e) => setFormData({ ...formData, ph_level: e.target.value })}
                                            placeholder="e.g., 6.5"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="nitrogen_level">{t('soil.nitrogen')}</Label>
                                        <Select value={formData.nitrogen_level} onValueChange={(value) => setFormData({ ...formData, nitrogen_level: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phosphorus_level">{t('soil.phosphorus')}</Label>
                                        <Select value={formData.phosphorus_level} onValueChange={(value) => setFormData({ ...formData, phosphorus_level: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="potassium_level">{t('soil.potassium')}</Label>
                                        <Select value={formData.potassium_level} onValueChange={(value) => setFormData({ ...formData, potassium_level: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="organic_matter">{t('soil.organicMatter')}</Label>
                                        <Input
                                            id="organic_matter"
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            value={formData.organic_matter_percent}
                                            onChange={(e) => setFormData({ ...formData, organic_matter_percent: e.target.value })}
                                            placeholder="e.g., 3.5"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="moisture">{t('soil.moisture')}</Label>
                                        <Input
                                            id="moisture"
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            value={formData.moisture_percent}
                                            onChange={(e) => setFormData({ ...formData, moisture_percent: e.target.value })}
                                            placeholder="e.g., 25.5"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Additional Information</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sample_count">Number of Samples</Label>
                                        <Input
                                            id="sample_count"
                                            type="number"
                                            min="1"
                                            value={formData.sample_count}
                                            onChange={(e) => setFormData({ ...formData, sample_count: e.target.value })}
                                            placeholder="e.g., 3"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="contact_phone">{t('common.phone')} *</Label>
                                        <Input
                                            id="contact_phone"
                                            type="tel"
                                            required
                                            value={formData.contact_phone}
                                            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                                            placeholder="e.g., +91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Any additional information about your soil or specific concerns..."
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : t('soil.analyze')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Footer/>
        </Layout>
    );
};

export default SoilCheck;
