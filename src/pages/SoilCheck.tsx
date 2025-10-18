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
import { TestTube, Droplets, Leaf, Activity, Bot } from 'lucide-react';
import Footer from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot';

const SoilCheck: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

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

    // Helper for input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormData({ ...formData, [id]: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            toast({
                title: t('soil.toast.auth_title'),
                description: t('soil.toast.auth_description'),
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
                status: 'pending'
            });

        setIsSubmitting(false);

        if (error) {
            console.error('Error submitting soil check:', error);
            toast({
                title: t('soil.toast.fail_title'),
                description: t('soil.toast.fail_description') + error.message,
                variant: 'destructive'
            });
            return;
        }

        toast({
            title: t('soil.toast.success_title'),
            description: t('soil.toast.success_description')
        });

        // Reset form (implementation omitted for brevity, keeping original keys)
        setFormData({
             location: '', farm_area_acres: '', primary_crop: '', soil_type: '', ph_level: '', nitrogen_level: '', phosphorus_level: '', potassium_level: '', organic_matter_percent: '', moisture_percent: '', sample_count: '', contact_phone: '', notes: ''
        });
    };


    return (
        <Layout>
            <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
                    
            {!isChatOpen && (
                <Button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-8 right-8 flex items-center justify-center gap-3 rounded-full shadow-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 z-50 px-7 py-7"
                >
                    <Bot className="text-white" style={{ width: '30px', height: '30px' }} />
                    <span className="text-white font-semibold text-2xl">{t('ai_button')}</span>
                </Button>
            )}


            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <TestTube className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{t('soil.page_title')}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('soil.page_subtitle')}
                    </p>
                </div>

                {/* Features Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card>
                        <CardHeader>
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2"><Droplets className="h-6 w-6 text-primary" /></div>
                            <CardTitle className="text-lg">{t('soil.feature_analysis_title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{t('soil.feature_analysis_description')}</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2"><Leaf className="h-6 w-6 text-primary" /></div>
                            <CardTitle className="text-lg">{t('soil.feature_crop_title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{t('soil.feature_crop_description')}</CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2"><Activity className="h-6 w-6 text-primary" /></div>
                            <CardTitle className="text-lg">{t('soil.feature_expert_title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{t('soil.feature_expert_description')}</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Soil Check Form */}
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t('soil.form_request_title')}</CardTitle>
                        <CardDescription>
                            {t('soil.form_request_description')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Farm Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('soil.farm_info_title')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="location">{t('soil.location')} *</Label>
                                        <Input
                                            id="location"
                                            required
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder={t('soil.location_placeholder')}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farm_area">{t('soil.farm_area')}</Label>
                                        <Input
                                            id="farm_area_acres"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.farm_area_acres}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 5.5"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="primary_crop">{t('soil.cropType')}</Label>
                                        <Input
                                            id="primary_crop"
                                            value={formData.primary_crop}
                                            onChange={handleInputChange}
                                            placeholder={t('soil.crop_placeholder')}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="soil_type">{t('soil.soilType')}</Label>
                                        <Select value={formData.soil_type} onValueChange={(value) => handleSelectChange('soil_type', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('soil.select_soil_type')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clay">{t('soil.type_clay')}</SelectItem>
                                                <SelectItem value="sandy">{t('soil.type_sandy')}</SelectItem>
                                                <SelectItem value="loamy">{t('soil.type_loamy')}</SelectItem>
                                                <SelectItem value="silty">{t('soil.type_silty')}</SelectItem>
                                                <SelectItem value="peaty">{t('soil.type_peaty')}</SelectItem>
                                                <SelectItem value="chalky">{t('soil.type_chalky')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Soil Parameters */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('soil.parameters_title')}</h3>
                                <p className="text-sm text-muted-foreground">{t('soil.parameters_subtitle')}</p>
                                
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ph_level">{t('soil.ph')}</Label>
                                        <Input
                                            id="ph_level"
                                            type="number"
                                            min="0" max="14" step="0.1"
                                            value={formData.ph_level}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 6.5"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="nitrogen_level">{t('soil.nitrogen')}</Label>
                                        <Select value={formData.nitrogen_level} onValueChange={(value) => handleSelectChange('nitrogen_level', value)}>
                                            <SelectTrigger><SelectValue placeholder={t('soil.select_level')} /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">{t('soil.level_low')}</SelectItem>
                                                <SelectItem value="medium">{t('soil.level_medium')}</SelectItem>
                                                <SelectItem value="high">{t('soil.level_high')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phosphorus_level">{t('soil.phosphorus')}</Label>
                                        <Select value={formData.phosphorus_level} onValueChange={(value) => handleSelectChange('phosphorus_level', value)}>
                                            <SelectTrigger><SelectValue placeholder={t('soil.select_level')} /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">{t('soil.level_low')}</SelectItem>
                                                <SelectItem value="medium">{t('soil.level_medium')}</SelectItem>
                                                <SelectItem value="high">{t('soil.level_high')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="potassium_level">{t('soil.potassium')}</Label>
                                        <Select value={formData.potassium_level} onValueChange={(value) => handleSelectChange('potassium_level', value)}>
                                            <SelectTrigger><SelectValue placeholder={t('soil.select_level')} /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">{t('soil.level_low')}</SelectItem>
                                                <SelectItem value="medium">{t('soil.level_medium')}</SelectItem>
                                                <SelectItem value="high">{t('soil.level_high')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="organic_matter">{t('soil.organicMatter')}</Label>
                                        <Input
                                            id="organic_matter_percent"
                                            type="number"
                                            min="0" max="100" step="0.1"
                                            value={formData.organic_matter_percent}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 3.5"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="moisture">{t('soil.moisture')}</Label>
                                        <Input
                                            id="moisture_percent"
                                            type="number"
                                            min="0" max="100" step="0.1"
                                            value={formData.moisture_percent}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 25.5"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{t('soil.additional_info_title')}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sample_count">{t('soil.sample_count_label')}</Label>
                                        <Input
                                            id="sample_count"
                                            type="number"
                                            min="1"
                                            value={formData.sample_count}
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                            placeholder={t('soil.phone_placeholder')}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">{t('soil.notes_label')}</Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder={t('soil.notes_placeholder')}
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? t('soil.submitting') : t('soil.analyze')}
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