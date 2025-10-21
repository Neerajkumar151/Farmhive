
import React, { useState } from 'react';
import { useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Search } from 'lucide-react';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface Scheme {
  name: string;
  description: string;
  category: string;
  link: string;
  eligibility: string;
  state: string;
}


const INITIAL_SCHEMES_LIMIT = 9;
const SCHEMES_PER_LOAD = 9;

export default function Resources() {
  const { t } = useTranslation(); // Initialize useTranslation
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('All')); // Use t() for initial state
  const [selectedState, setSelectedState] = useState(t('All States')); // Use t() for initial state
  const [visibleSchemesLimit, setVisibleSchemesLimit] = useState(INITIAL_SCHEMES_LIMIT);

  useEffect(() => {
  // When language changes, reset the filters to the newly translated default values.
  setSelectedCategory(t('All'));
  setSelectedState(t('All States'));
  // We also reset the search query for a clean slate
  setSearchQuery('');
}, [t]);

 
  // Placeholder: all India schemes
const allIndiaSchemes= useMemo((): Scheme[] => [
    {
    name: t("PM-KISAN"),
    description: t("Income support of ₹6,000 per year to farmers."),
    category: t("Income Support"),
    link: "https://pmkisan.gov.in/",
    eligibility: t("All landholding farmers"),
    state: t("All India")
  },
  {
    name: t("PMFBY"),
    description: t("Crop insurance covering yield loss due to natural calamities, pests & diseases."),
    category: t("Insurance"),
    link: "https://pmfby.gov.in/",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("Soil Health Card Scheme"),
    description: t("Provides farmers with soil health cards with crop-wise recommendations."),
    category: t("Soil Health"),
    link: "https://soilhealth.dac.gov.in/",
    eligibility: t("All farmers with agricultural land"),
    state: t("All India")
  },
  {
    name: t("Paramparagat Krishi Vikas Yojana (PKVY)"),
    description: t("Promotes organic farming through cluster-based approach with financial assistance."),
    category: t("Organic Farming"),
    link: "https://agricoop.gov.in/en/schemes/paramparagat-krishi-vikas-yojana-pkvy",
    eligibility: t("Groups practicing organic farming"),
    state: t("All India")
  },
  {
    name: t("Pradhan Mantri Krishi Sinchai Yojana (PMKSY)"),
    description: t("Expand cultivated area with assured irrigation, improve water use efficiency."),
    category: t("Irrigation"),
    link: "https://pmksy.gov.in/",
    eligibility: t("Farmers with agricultural land"),
    state: t("All India")
  },
  {
    name: t("Kisan Credit Card (KCC)"),
    description: t("Provides timely credit support at concessional interest rates."),
    category: t("Credit"),
    link: "https://agricoop.gov.in/kisan-credit-card-scheme",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("National Mission for Sustainable Agriculture (NMSA)"),
    description: t("Promotes sustainable practices through soil, water, and climate resilience."),
    category: t("Sustainable Agriculture"),
    link: "https://agricoop.gov.in/en/national-mission-sustainable-agriculture-nmsa",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("Sub-Mission on Agricultural Mechanization (SMAM)"),
    description: t("Financial assistance for farm machinery & equipment to boost mechanization."),
    category: t("Mechanization"),
    link: "https://agricoop.gov.in/en/sub-mission-agriculture-mechanization-smam",
    eligibility: t("Farmers, SHGs, FPOs"),
    state: t("All India")
  },
  {
    name: t("National Agricultural Market (eNAM)"),
    description: t("Promotes online trading of farm produce."),
    category: t("Technology Adoption"),
    link: "https://enam.gov.in/web/",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("Pradhan Mantri Kisan Mandhan Yojana"),
    description: t("Pension scheme for small and marginal farmers."),
    category: t("Income Support"),
    link: "https://pmkisan.gov.in/",
    eligibility: t("Small & marginal farmers"),
    state: t("All India")
  },
  {
    name: t("Kisan Samman Pension Scheme"),
    description: t("Pension for elderly farmers."),
    category: t("Income Support"),
    link: "https://pmkisan.gov.in/",
    eligibility: t("Farmers above 60 years"),
    state: t("All India")
  },
  {
    name: t("Pradhan Mantri Matsya Sampada Yojana (PMMSY)"),
    description: t("Development of fisheries and aquaculture."),
    category: t("Technology Adoption"),
    link: "https://pmmsy.dof.gov.in/",
    eligibility: t("Fishermen & fish farmers"),
    state: t("All India")
  },
  {
    name: t("National Food Security Mission (NFSM)"),
    description: t("Enhances production of rice, wheat, pulses, and coarse cereals."),
    category: t("Sustainable Agriculture"),
    link: "https://nfsm.gov.in/",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("Rashtriya Krishi Vikas Yojana (RKVY)"),
    description: t("Support for agriculture development and diversification."),
    category: t("Sustainable Agriculture"),
    link: "https://rkvy.nic.in/",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("Soil Health Management (SHM)"),
    description: t("Improves soil fertility through integrated nutrient management."),
    category: t("Soil Health"),
    link: "https://agricoop.gov.in/en/soil-health-management",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("National Mission on Agriculture Extension & Technology (NMAET)"),
    description: t("Improves technology adoption and farmer knowledge."),
    category: t("Technology Adoption"),
    link: "https://agricoop.gov.in/en/national-mission-agriculture-extension-technology-nmaet",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("National Cooperative Development Corporation (NCDC)"),
    description: t("Provides financial support for agri cooperatives."),
    category: t("Credit"),
    link: "https://ncdc.nic.in/",
    eligibility: t("Farmers and cooperatives"),
    state: t("All India")
  },
  {
    name: t("Pradhan Mantri Fasal Bima Yojana - Loanee"),
    description: t("Insurance for loanee farmers against crop loss."),
    category: t("Insurance"),
    link: "https://pmfby.gov.in/",
    eligibility: t("Loan-taking farmers"),
    state: t("All India")
  },
  {
    name: t("Soil Health Card - Organic Inputs Support"),
    description: t("Encourages organic input use for better soil health."),
    category: t("Organic Farming"),
    link: "https://soilhealth.dac.gov.in/",
    eligibility: t("All farmers"),
    state: t("All India")
  },
  {
    name: t("Sub-Mission on Seed & Planting Material"),
    description: t("Promotes quality seed and planting material production."),
    category: t("Technology Adoption"),
    link: "https://agricoop.gov.in/en/sub-mission-seed-planting-material",
    eligibility: t("All farmers"),
    state: t("All India")
  },
],[t]);

// Placeholder: add similar state-wise schemes covering all categories here
// Example for UP:



const upSchemes= useMemo((): Scheme[] => [
  {
    name: t("Kisan Sarvhit Bima Yojana"),
    description: t("Insurance for accidental death, disability & hospitalization."),
    category: t("Insurance"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("Farmer families"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Seed Subsidy Program"),
    description: t("Subsidy for certified seeds."),
    category: t("Technology Adoption"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("All farmers in UP"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Kisan Credit Card"),
    description: t("Credit support for cultivation and allied activities."),
    category: t("Credit"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("Farmers in UP"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Micro Irrigation Scheme"),
    description: t("Supports drip & sprinkler irrigation systems."),
    category: t("Irrigation"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("Farmers in UP"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Soil Health Management"),
    description: t("Soil testing & fertility improvement."),
    category: t("Soil Health"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("Farmers in UP"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Organic Farming Initiative"),
    description: t("Encourages organic farming clusters."),
    category: t("Organic Farming"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("Interested farmers"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Sustainable Agriculture Support"),
    description: t("Promotes crop rotation & climate-resilient practices."),
    category: t("Sustainable Agriculture"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("Farmers in UP"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Farmer Technology Program"),
    description: t("Training and demonstration of modern agricultural tech."),
    category: t("Technology Adoption"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("Farmers in UP"),
    state: t("Uttar Pradesh")
  },
  {
    name: t("UP Income Support Yojana"),
    description: t("Direct cash assistance for small farmers."),
    category: t("Income Support"),
    link: "https://upagripardarshi.gov.in/",
    eligibility: t("All land-owning farmers"),
    state: t("Uttar Pradesh")
  },
],[t]);

// BIHAR
const biharSchemes= useMemo(():Scheme[] => [
  {
    name: t("Bhavantar Bhugtan Yojana"),
    description: t("Price difference compensation for oilseeds & pulses."),
    category: t("Income Support"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("Farmers cultivating notified crops"),
    state: t("Bihar")
  },
  {
    name: t("Bihar State Crop Insurance Scheme"),
    description: t("Insurance coverage for crop loss due to natural disasters."),
    category: t("Insurance"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("Farmers in Bihar"),
    state: t("Bihar")
  },
  {
    name: t("Bihar Soil Health Program"),
    description: t("Soil testing and nutrient management."),
    category: t("Soil Health"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("All farmers in Bihar"),
    state: t("Bihar")
  },
  {
    name: t("Bihar Micro Irrigation Scheme"),
    description: t("Support for drip and sprinkler irrigation systems."),
    category: t("Irrigation"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("All farmers in Bihar"),
    state: t("Bihar")
  },
  {
    name: t("Bihar Kisan Credit Card"),
    description: t("Credit support for cultivation & allied activities."),
    category: t("Credit"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("Farmers in Bihar"),
    state: t("Bihar")
  },
  {
    name: t("Bihar Agricultural Mechanization Support"),
    description: t("Subsidy for farm machinery purchase."),
    category: t("Mechanization"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("Farmers in Bihar"),
    state: t("Bihar")
  },
  {
    name: t("Bihar Organic Farming Support"),
    description: t("Promotion of organic farming practices."),
    category: t("Organic Farming"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("Interested farmers"),
    state: t("Bihar")
  },
  {
    name: t("Bihar Technology Adoption Program"),
    description: t("Demonstration of modern agriculture technologies."),
    category: t("Technology Adoption"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("Farmers in Bihar"),
    state: t("Bihar")
  },
  {
    name: t("Bihar Sustainable Agriculture Initiative"),
    description: t("Promotion of crop rotation & climate resilient farming."),
    category: t("Sustainable Agriculture"),
    link: "https://agribihar.bihar.gov.in/",
    eligibility: t("Farmers in Bihar"),
    state: t("Bihar")
  }
],[t]);

// TELANGANA
const telanganaSchemes= useMemo((): Scheme[] => [
  {
    name: t("Rythu Bandhu Scheme"),
    description: t("Investment support for agriculture & horticulture crops."),
    category: t("Income Support"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("Land-owning farmers"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Crop Insurance Scheme"),
    description: t("Insurance for crop losses due to natural disasters."),
    category: t("Insurance"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("All farmers in Telangana"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Soil Health Program"),
    description: t("Soil testing and nutrient management support."),
    category: t("Soil Health"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("All farmers"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Micro Irrigation Scheme"),
    description: t("Support for drip & sprinkler irrigation."),
    category: t("Irrigation"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("Farmers in Telangana"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Kisan Credit Card"),
    description: t("Credit support for cultivation & allied activities."),
    category: t("Credit"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("Farmers in Telangana"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Agricultural Mechanization"),
    description: t("Financial assistance for farm machinery."),
    category: t("Mechanization"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("Farmers in Telangana"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Organic Farming Program"),
    description: t("Promotes organic farming clusters."),
    category: t("Organic Farming"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("Interested farmers"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Technology Adoption Program"),
    description: t("Training in modern agri tech and practices."),
    category: t("Technology Adoption"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("Farmers in Telangana"),
    state: t("Telangana")
  },
  {
    name: t("Telangana Sustainable Agriculture Program"),
    description: t("Promotes eco-friendly farming practices."),
    category: t("Sustainable Agriculture"),
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: t("Farmers in Telangana"),
    state: t("Telangana")
  }
],[t]);

// KARNATAKA
const karnatakaSchemes= useMemo((): Scheme[] => [
  {
    name: t("Raita Siri Scheme"),
    description: t("Financial support for millet cultivation."),
    category: t("Income Support"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("Millet farmers"),
    state: t("Karnataka")
  },
  {
    name: t("Karnataka Crop Insurance Scheme"),
    description: t("Insurance coverage for crop losses."),
    category: t("Insurance"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("All farmers in Karnataka"),
    state: t("Karnataka")
  },
  {
    name: t("Karnataka Soil Health Program"),
    description: t("Soil testing & fertility improvement."),
    category: t("Soil Health"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("All farmers"),
    state: t("Karnataka")
  },
  {
    name: t("Krishi Bhagya Scheme"),
    description: t("Supports micro-irrigation & water conservation."),
    category: t("Irrigation"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("Farmers in Karnataka"),
    state: t("Karnataka")
  },
  {
    name: t("Karnataka Kisan Credit Card"),
    description: t("Credit support for cultivation & allied activities."),
    category: t("Credit"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("Farmers in Karnataka"),
    state: t("Karnataka")
  },
  {
    name: t("Karnataka Agricultural Mechanization"),
    description: t("Financial support for farm equipment."),
    category: t("Mechanization"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("Farmers in Karnataka"),
    state: t("Karnataka")
  },
  {
    name: t("Karnataka Organic Farming Program"),
    description: t("Encourages organic farming clusters."),
    category: t("Organic Farming"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("Interested farmers"),
    state: t("Karnataka")
  },
  {
    name: t("Karnataka Technology Adoption Program"),
    description: t("Demonstration of modern agriculture tech."),
    category: t("Technology Adoption"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("Farmers in Karnataka"),
    state: t("Karnataka")
  },
  {
    name: t("Karnataka Sustainable Agriculture Program"),
    description: t("Promotes eco-friendly & resilient farming."),
    category: t("Sustainable Agriculture"),
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: t("Farmers in Karnataka"),
    state: t("Karnataka")
  }
],[t]);

const maharashtraSchemes= useMemo((): Scheme[] => [
  { name: t("Jalyukta Shivar Abhiyan"), description: t("Water conservation & micro-irrigation."), category: t("Irrigation"), link: "https://mahaagri.gov.in/", eligibility: t("Farmers in drought-prone areas"), state: t("Maharashtra") },
  { name: t("Maharashtra Crop Insurance"), description: t("Covers crop loss due to natural disasters."), category: t("Insurance"), link: "https://mahaagri.gov.in/", eligibility: t("Farmers in Maharashtra"), state: t("Maharashtra") },
  { name: t("Maharashtra Income Support"), description: t("Direct cash support for small farmers."), category: t("Income Support"), link: "https://mahaagri.gov.in/", eligibility: t("All farmers"), state: t("Maharashtra") },
  { name: t("Maharashtra Soil Health Program"), description: t("Soil testing & nutrient recommendations."), category: t("Soil Health"), link: "https://mahaagri.gov.in/", eligibility: t("All farmers"), state: t("Maharashtra") },
  { name: t("Maharashtra KCC"), description: t("Credit for cultivation & allied activities."), category: t("Credit"), link: "https://mahaagri.gov.in/", eligibility: t("Farmers in Maharashtra"), state: t("Maharashtra") },
  { name: t("Maharashtra Mechanization Subsidy"), description: t("Subsidy for farm machinery & equipment."), category: t("Mechanization"), link: "https://mahaagri.gov.in/", eligibility: t("Farmers & SHGs"), state: t("Maharashtra") },
  { name: t("Maharashtra Organic Farming"), description: t("Promotion of organic farming practices."), category: t("Organic Farming"), link: "https://mahaagri.gov.in/", eligibility: t("Interested farmers"), state: t("Maharashtra") },
  { name: t("Maharashtra Technology Program"), description: t("Modern agri-tech adoption training."), category: t("Technology Adoption"), link: "https://mahaagri.gov.in/", eligibility: t("Farmers in Maharashtra"), state: t("Maharashtra") },
  { name: t("Maharashtra Sustainable Agri Program"), description: t("Eco-friendly farming & crop rotation."), category: t("Sustainable Agriculture"), link: "https://mahaagri.gov.in/", eligibility: t("All farmers"), state: t("Maharashtra") }
],[t]);

const gujaratSchemes= useMemo((): Scheme[] => [
  { name: t("CM Kisan Sahay Yojana"), description: t("Compensation for crop loss due to calamities."), category: t("Insurance"), link: "https://agri.gujarat.gov.in/", eligibility: t("Farmers cultivating notified crops"), state: t("Gujarat") },
  { name: t("Gujarat Seed Subsidy"), description: t("Subsidy for certified seeds."), category: t("Technology Adoption"), link: "https://agri.gujarat.gov.in/", eligibility: t("All farmers"), state: t("Gujarat") },
  { name: t("Gujarat Income Support"), description: t("Direct cash assistance for farmers."), category: t("Income Support"), link: "https://agri.gujarat.gov.in/", eligibility: t("All farmers"), state: t("Gujarat") },
  { name: t("Gujarat Soil Health Program"), description: t("Soil testing and fertility improvement."), category: t("Soil Health"), link: "https://agri.gujarat.gov.in/", eligibility: t("All farmers"), state: t("Gujarat") },
  { name: t("Gujarat KCC"), description: t("Credit for cultivation & equipment."), category: t("Credit"), link: "https://agri.gujarat.gov.in/", eligibility: t("All farmers"), state: t("Gujarat") },
  { name: t("Gujarat Mechanization Scheme"), description: t("Support for farm machinery."), category: t("Mechanization"), link: "https://agri.gujarat.gov.in/", eligibility: t("Farmers & SHGs"), state: t("Gujarat") },
  { name: t("Gujarat Organic Farming Program"), description: t("Promotes organic farming clusters."), category: t("Organic Farming"), link: "https://agri.gujarat.gov.in/", eligibility: t("Interested farmers"), state: t("Gujarat") },
  { name: t("Gujarat Sustainable Agri Program"), description: t("Promotes eco-friendly & resilient practices."), category: t("Sustainable Agriculture"), link: "https://agri.gujarat.gov.in/", eligibility: t("Farmers"), state: t("Gujarat") }
],[t]);

const odishaSchemes= useMemo((): Scheme[] => [
  { name: t("Odisha Farmer Assistance"), description: t("Subsidies for seeds, fertilizers, irrigation."), category: t("Income Support"), link: "https://agriculture.odisha.gov.in/", eligibility: t("All farmers"), state: t("Odisha") },
  { name: t("Odisha Crop Insurance"), description: t("Insurance support against crop loss."), category: t("Insurance"), link: "https://agriculture.odisha.gov.in/", eligibility: t("Farmers in Odisha"), state: t("Odisha") },
  { name: t("Odisha Soil Health"), description: t("Soil testing & management programs."), category: t("Soil Health"), link: "https://agriculture.odisha.gov.in/", eligibility: t("All farmers"), state: t("Odisha") },
  { name: t("Odisha Micro Irrigation"), description: t("Drip & sprinkler irrigation assistance."), category: t("Irrigation"), link: "https://agriculture.odisha.gov.in/", eligibility: t("All farmers"), state: t("Odisha") },
  { name: t("Odisha KCC"), description: t("Credit for cultivation & allied activities."), category: t("Credit"), link: "https://agriculture.odisha.gov.in/", eligibility: t("Farmers"), state: t("Odisha") },
  { name: t("Odisha Mechanization"), description: t("Support for farm machinery."), category: t("Mechanization"), link: "https://agriculture.odisha.gov.in/", eligibility: t("Farmers"), state: t("Odisha") },
  { name: t("Odisha Organic Farming"), description: t("Promotion of organic farming clusters."), category: t("Organic Farming"), link: "https://agriculture.odisha.gov.in/", eligibility: t("Interested farmers"), state: t("Odisha") },
  { name: t("Odisha Technology Adoption"), description: t("Modern agri tech training."), category: t("Technology Adoption"), link: "https://agriculture.odisha.gov.in/", eligibility: t("All farmers"), state: t("Odisha") },
  { name: t("Odisha Sustainable Agriculture"), description: t("Promotes resilient & eco-friendly practices."), category: t("Sustainable Agriculture"), link: "https://agriculture.odisha.gov.in/", eligibility: t("Farmers"), state: t("Odisha") }
],[t]);

const tamilNaduSchemes= useMemo((): Scheme[] => [
  { name: t("TN Crop Insurance"), description: t("State crop insurance covering yield losses."), category: t("Insurance"), link: "https://www.tn.gov.in/agriculture", eligibility: t("Farmers in Tamil Nadu"), state: t("Tamil Nadu") },
  { name: t("TN Micro Irrigation Scheme"), description: t("Supports drip & sprinkler irrigation."), category: t("Irrigation"), link: "https://www.tn.gov.in/agriculture", eligibility: t("Farmers in Tamil Nadu"), state: t("Tamil Nadu") },
  { name: t("TN Soil Health Program"), description: t("Soil testing & nutrient recommendations."), category: t("Soil Health"), link: "https://www.tn.gov.in/agriculture", eligibility: t("All farmers"), state: t("Tamil Nadu") },
  { name: t("TN KCC"), description: t("Credit support for cultivation & allied activities."), category: t("Credit"), link: "https://www.tn.gov.in/agriculture", eligibility: t("Farmers in Tamil Nadu"), state: t("Tamil Nadu") },
  { name: t("TN Income Support Yojana"), description: t("Direct cash assistance for small farmers."), category: t("Income Support"), link: "https://www.tn.gov.in/agriculture", eligibility: t("All farmers"), state: t("Tamil Nadu") },
  { name: t("TN Mechanization Subsidy"), description: t("Subsidy for farm machinery & equipment."), category: t("Mechanization"), link: "https://www.tn.gov.in/agriculture", eligibility: t("Farmers & SHGs"), state: t("Tamil Nadu") },
  { name: t("TN Organic Farming Program"), description: t("Promotes organic farming clusters."), category: t("Organic Farming"), link: "https://www.tn.gov.in/agriculture", eligibility: t("Interested farmers"), state: t("Tamil Nadu") },
  { name: t("TN Technology Adoption Program"), description: t("Training for modern agri-tech adoption."), category: t("Technology Adoption"), link: "https://www.tn.gov.in/agriculture", eligibility: t("Farmers in Tamil Nadu"), state: t("Tamil Nadu") },
  { name: t("TN Sustainable Agriculture"), description: t("Promotes eco-friendly & resilient practices."), category: t("Sustainable Agriculture"), link: "https://www.tn.gov.in/agriculture", eligibility: t("Farmers in Tamil Nadu"), state: t("Tamil Nadu") }
],[t]);

const punjabSchemes= useMemo((): Scheme[] => [
  { name: t("Punjab Crop Insurance"), description: t("Insurance against crop loss due to natural disasters."), category: t("Insurance"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Farmers in Punjab"), state: t("Punjab") },
  { name: t("Punjab Micro Irrigation"), description: t("Support for drip & sprinkler irrigation."), category: t("Irrigation"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Farmers in Punjab"), state: t("Punjab") },
  { name: t("Punjab Soil Health"), description: t("Soil testing & nutrient recommendations."), category: t("Soil Health"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Farmers"), state: t("Punjab") },
  { name: t("Punjab KCC"), description: t("Credit for cultivation & allied activities."), category: t("Credit"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Farmers"), state: t("Punjab") },
  { name: t("Punjab Income Support"), description: t("Direct cash assistance for small farmers."), category: t("Income Support"), link: "https://agriculture.punjab.gov.in/", eligibility: t("All farmers"), state: t("Punjab") },
  { name: t("Punjab Mechanization Scheme"), description: t("Subsidy for farm machinery & equipment."), category: t("Mechanization"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Farmers & SHGs"), state: t("Punjab") },
  { name: t("Punjab Organic Farming Program"), description: t("Promotion of organic farming clusters."), category: t("Organic Farming"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Interested farmers"), state: t("Punjab") },
  { name: t("Punjab Technology Adoption"), description: t("Training for modern agricultural tech."), category: t("Technology Adoption"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Farmers"), state: t("Punjab") },
  { name: t("Punjab Sustainable Agriculture"), description: t("Climate-resilient & eco-friendly practices."), category: t("Sustainable Agriculture"), link: "https://agriculture.punjab.gov.in/", eligibility: t("Farmers"), state: t("Punjab") }
],[t]);

const rajasthanSchemes= useMemo((): Scheme[] => [
  { name: t("Rajasthan Crop Insurance"), description: t("Insurance for crop loss due to natural disasters."), category: t("Insurance"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Farmers in Rajasthan"), state: t("Rajasthan") },
  { name: t("Rajasthan Micro Irrigation"), description: t("Drip & sprinkler irrigation support."), category: t("Irrigation"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Farmers in Rajasthan"), state: t("Rajasthan") },
  { name: t("Rajasthan Soil Health"), description: t("Soil testing & nutrient improvement."), category: t("Soil Health"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Farmers"), state: t("Rajasthan") },
  { name: t("Rajasthan KCC"), description: t("Credit for cultivation & allied activities."), category: t("Credit"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Farmers"), state: t("Rajasthan") },
  { name: t("Rajasthan Income Support"), description: t("Direct cash assistance for farmers."), category: t("Income Support"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("All farmers"), state: t("Rajasthan") },
  { name: t("Rajasthan Mechanization Program"), description: t("Subsidy for farm machinery & equipment."), category: t("Mechanization"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Farmers & SHGs"), state: t("Rajasthan") },
  { name: t("Rajasthan Organic Farming"), description: t("Promotion of organic farming clusters."), category: t("Organic Farming"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Interested farmers"), state: t("Rajasthan") },
  { name: t("Rajasthan Technology Adoption"), description: t("Training for modern agri-tech adoption."), category: t("Technology Adoption"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Farmers"), state: t("Rajasthan") },
  { name: t("Rajasthan Sustainable Agriculture"), description: t("Eco-friendly & climate-resilient practices."), category: t("Sustainable Agriculture"), link: "https://agriculture.rajasthan.gov.in/", eligibility: t("Farmers"), state: t("Rajasthan") }
],[t]);

const mpSchemes= useMemo((): Scheme[] => [
  { name: t("MP Crop Insurance"), description: t("Insurance for crop loss due to natural disasters."), category: t("Insurance"), link: "https://mpagriculture.in/", eligibility: t("Farmers in MP"), state: t("Madhya Pradesh") },
  { name: t("MP Micro Irrigation"), description: t("Support for drip & sprinkler irrigation."), category: t("Irrigation"), link: "https://mpagriculture.in/", eligibility: t("Farmers in MP"), state: t("Madhya Pradesh") },
  { name: t("MP Soil Health Program"), description: t("Soil testing & nutrient management."), category: t("Soil Health"), link: "https://mpagriculture.in/", eligibility: t("Farmers in MP"), state: t("Madhya Pradesh") },
  { name: t("MP KCC"), description: t("Credit for cultivation & allied activities."), category: t("Credit"), link: "https://mpagriculture.in/", eligibility: t("Farmers"), state: t("Madhya Pradesh") },
  { name: t("MP Income Support"), description: t("Direct cash assistance for small farmers."), category: t("Income Support"), link: "https://mpagriculture.in/", eligibility: t("All farmers"), state: t("Madhya Pradesh") },
  { name: t("MP Mechanization Scheme"), description: t("Support for farm machinery & equipment."), category: t("Mechanization"), link: "https://mpagriculture.in/", eligibility: t("Farmers & SHGs"), state: t("Madhya Pradesh") },
  { name: t("MP Organic Farming"), description: t("Promotes organic farming clusters."), category: t("Organic Farming"), link: "https://mpagriculture.in/", eligibility: t("Interested farmers"), state: t("Madhya Pradesh") },
  { name: t("MP Technology Adoption"), description: t("Modern agri-tech training & demos."), category: t("Technology Adoption"), link: "https://mpagriculture.in/", eligibility: t("Farmers"), state: t("Madhya Pradesh") },
  { name: t("MP Sustainable Agriculture"), description: t("Promotes crop rotation & eco-friendly practices."), category: t("Sustainable Agriculture"), link: "https://mpagriculture.in/", eligibility: t("Farmers"), state: t("Madhya Pradesh") }
],[t]);

const cgSchemes= useMemo((): Scheme[] => [
  { name: t("CG Crop Insurance"), description: t("Insurance for yield loss due to natural disasters."), category: t("Insurance"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Farmers in CG"), state: t("Chhattisgarh") },
  { name: t("CG Micro Irrigation"), description: t("Support for drip & sprinkler systems."), category: t("Irrigation"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Farmers in CG"), state: t("Chhattisgarh") },
  { name: t("CG Soil Health Program"), description: t("Soil testing & fertility improvement."), category: t("Soil Health"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Farmers in CG"), state: t("Chhattisgarh") },
  { name: t("CG KCC"), description: t("Credit for cultivation & allied activities."), category: t("Credit"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Farmers"), state: t("Chhattisgarh") },
  { name: t("CG Income Support"), description: t("Direct cash assistance for farmers."), category: t("Income Support"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("All farmers"), state: t("Chhattisgarh") },
  { name: t("CG Mechanization Scheme"), description: t("Subsidy for farm machinery."), category: t("Mechanization"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Farmers & SHGs"), state: t("Chhattisgarh") },
  { name: t("CG Organic Farming"), description: t("Promotion of organic farming clusters."), category: t("Organic Farming"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Interested farmers"), state: t("Chhattisgarh") },
  { name: t("CG Technology Adoption"), description: t("Training for modern agri-tech adoption."), category: t("Technology Adoption"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Farmers"), state: t("Chhattisgarh") },
  { name: t("CG Sustainable Agriculture"), description: t("Eco-friendly & climate-resilient farming practices."), category: t("Sustainable Agriculture"), link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: t("Farmers"), state: t("Chhattisgarh") }
],[t]);


const wbSchemes= useMemo((): Scheme[] => [
  { name: t("WB Crop Insurance"), description: t("Covers yield loss due to natural disasters."), category: t("Insurance"), link: "https://wbagriculture.in/", eligibility: t("Farmers in WB"), state: t("West Bengal") },
  { name: t("WB Micro Irrigation"), description: t("Support for drip & sprinkler systems."), category: t("Irrigation"), link: "https://wbagriculture.in/", eligibility: t("Farmers in WB"), state: t("West Bengal") },
  { name: t("WB Soil Health Program"), description: t("Soil testing & nutrient management."), category: t("Soil Health"), link: "https://wbagriculture.in/", eligibility: t("Farmers in WB"), state: t("West Bengal") },
  { name: t("WB KCC"), description: t("Credit support for cultivation & allied activities."), category: t("Credit"), link: "https://wbagriculture.in/", eligibility: t("Farmers"), state: t("West Bengal") },
  { name: t("WB Income Support Yojana"), description: t("Direct cash assistance for small farmers."), category: t("Income Support"), link: "https://wbagriculture.in/", eligibility: t("All farmers"), state: t("West Bengal") },
  { name: t("WB Mechanization Program"), description: t("Support for farm machinery & equipment."), category: t("Mechanization"), link: "https://wbagriculture.in/", eligibility: t("Farmers & SHGs"), state: t("West Bengal") },
  { name: t("WB Organic Farming"), description: t("Promotion of organic farming clusters."), category: t("Organic Farming"), link: "https://wbagriculture.in/", eligibility: t("Interested farmers"), state: t("West Bengal") },
  { name: t("WB Technology Adoption"), description: t("Training for modern agri-tech adoption."), category: t("Technology Adoption"), link: "https://wbagriculture.in/", eligibility: t("Farmers"), state: t("West Bengal") },
  { name: t("WB Sustainable Agriculture"), description: t("Promotes climate-resilient & eco-friendly practices."), category: t("Sustainable Agriculture"), link: "https://wbagriculture.in/", eligibility: t("Farmers"), state: t("West Bengal") }
],[t]);

const andhraPradeshSchemes= useMemo((): Scheme[] => [
  { name: t("AP Rythu Bima Yojana"), description: t("Crop insurance & financial assistance."), category: t("Insurance"), link: "https://apaid.ap.gov.in/", eligibility: t("Farmers in AP"), state: t("Andhra Pradesh") },
  { name: t("AP Micro Irrigation"), description: t("Supports drip & sprinkler irrigation."), category: t("Irrigation"), link: "https://apaid.ap.gov.in/", eligibility: t("Farmers in AP"), state: t("Andhra Pradesh") },
  { name: t("AP Soil Health Program"), description: t("Soil testing & nutrient recommendations."), category: t("Soil Health"), link: "https://apaid.ap.gov.in/", eligibility: t("All farmers"), state: t("Andhra Pradesh") },
  { name: t("AP KCC"), description: t("Credit for cultivation & allied activities."), category: t("Credit"), link: "https://apaid.ap.gov.in/", eligibility: t("Farmers"), state: t("Andhra Pradesh") },
  { name: t("AP Income Support"), description: t("Direct cash assistance for small farmers."), category: t("Income Support"), link: "https://apaid.ap.gov.in/", eligibility: t("All farmers"), state: t("Andhra Pradesh") },
  { name: t("AP Mechanization Program"), description: t("Subsidy for farm machinery & equipment."), category: t("Mechanization"), link: "https://apaid.ap.gov.in/", eligibility: t("Farmers & SHGs"), state: t("Andhra Pradesh") },
  { name: t("AP Organic Farming"), description: t("Promotion of organic farming clusters."), category: t("Organic Farming"), link: "https://apaid.ap.gov.in/", eligibility: t("Interested farmers"), state: t("Andhra Pradesh") },
  { name: t("AP Technology Adoption"), description: t("Training for modern agri-tech adoption."), category: t("Technology Adoption"), link: "https://apaid.ap.gov.in/", eligibility: t("Farmers"), state: t("Andhra Pradesh") },
  { name: t("AP Sustainable Agriculture"), description: t("Promotes climate-resilient & eco-friendly practices."), category: t("Sustainable Agriculture"), link: "https://apaid.ap.gov.in/", eligibility: t("Farmers"), state: t("Andhra Pradesh") }
],[t]);

const haryanaSchemes= useMemo((): Scheme[] => [
  { name: t("Haryana Crop Insurance"), description: t("Insurance for crop loss due to natural disasters."), category: t("Insurance"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Farmers in Haryana"), state: t("Haryana") },
  { name: t("Haryana Micro Irrigation"), description: t("Support for drip & sprinkler irrigation."), category: t("Irrigation"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Farmers in Haryana"), state: t("Haryana") },
  { name: t("Haryana Soil Health Program"), description: t("Soil testing & fertility improvement."), category: t("Soil Health"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Farmers"), state: t("Haryana") },
  { name: t("Haryana KCC"), description: t("Credit support for cultivation & allied activities."), category: t("Credit"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Farmers"), state: t("Haryana") },
  { name: t("Haryana Income Support"), description: t("Direct cash assistance for small farmers."), category: t("Income Support"), link: "https://haryanaagriculture.gov.in/", eligibility: t("All farmers"), state: t("Haryana") },
  { name: t("Haryana Mechanization"), description: t("Support for farm machinery & equipment."), category: t("Mechanization"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Farmers & SHGs"), state: t("Haryana") },
  { name: t("Haryana Organic Farming"), description: t("Promotes organic farming clusters."), category: t("Organic Farming"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Interested farmers"), state: t("Haryana") },
  { name: t("Haryana Technology Adoption"), description: t("Modern agri-tech training & demos."), category: t("Technology Adoption"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Farmers"), state: t("Haryana") },
  { name: t("Haryana Sustainable Agriculture"), description: t("Promotes eco-friendly & resilient farming."), category: t("Sustainable Agriculture"), link: "https://haryanaagriculture.gov.in/", eligibility: t("Farmers"), state: t("Haryana") }
],[t]);


const schemes= useMemo((): Scheme[] => [
  ...allIndiaSchemes,
  ...upSchemes,
  ...biharSchemes,
  ...telanganaSchemes,
  ...karnatakaSchemes,
  ...maharashtraSchemes,
  ...gujaratSchemes,
  ...odishaSchemes,
  ...tamilNaduSchemes,
  ...punjabSchemes,
  ...rajasthanSchemes,
  ...mpSchemes,
  ...cgSchemes,
  ...wbSchemes,
  ...andhraPradeshSchemes,
  ...haryanaSchemes
],[t]);

const categories = useMemo(()=> [
  t("All"), t("Income Support"), t("Insurance"), t("Soil Health"), t("Irrigation"),
  t("Credit"), t("Mechanization"), t("Organic Farming"), t("Technology Adoption"),
  t("Sustainable Agriculture")
],[t]);

const statesList = useMemo(()=>[
  t("All States"), t("All India"), t("Andhra Pradesh"), t("Bihar"), t("Chhattisgarh"), t("Gujarat"),
  t("Haryana"), t("Karnataka"), t("Madhya Pradesh"), t("Maharashtra"), t("Odisha"), t("Punjab"),
  t("Rajasthan"), t("Tamil Nadu"), t("Telangana"), t("Uttar Pradesh"), t("West Bengal")
],[t]);


  const filteredSchemes = useMemo(()=> schemes
    .filter(scheme => {
      const matchesSearch =
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === t('All') || scheme.category === selectedCategory;

      // Note: State filtering logic needs to be updated to compare with translated strings
      const matchesState =
        selectedState === t('All States') ||
        (selectedState === t('All India') && scheme.state === t('All India')) ||
        (selectedState !== t('All India') && (scheme.state === selectedState || scheme.state === t('All India')));

      return matchesSearch && matchesCategory && matchesState;
    })
    .sort((a, b) => {
      if (a.state === selectedState) return -1;
      if (b.state === selectedState) return 1;
      return 0;
    }), [schemes, searchQuery, selectedCategory, selectedState, t]);

  const schemesToDisplay = filteredSchemes.slice(0, visibleSchemesLimit);
  const handleLoadMore = () => setVisibleSchemesLimit(prev => prev + SCHEMES_PER_LOAD);
  const allSchemesLoaded = visibleSchemesLimit >= filteredSchemes.length;

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden py-12 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Glassy overlay effect */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 dark:bg-black/20" />

        <div className="container relative z-10 mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              {t("Government Schemes & Yojanas")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("Explore central and state government schemes designed to empower Indian farmers")} 🌾
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-10 border-0 shadow-lg bg-white/40 dark:bg-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("Search schemes...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 focus:ring-2 focus:ring-emerald-400 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl"
                  />
                </div>

                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full md:w-[200px] bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border-0">
                    <SelectValue>
                      {selectedState !== t("All States") ? selectedState : t("Select State")}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {statesList.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px] bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border-0">
                    <SelectValue>{selectedCategory}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Schemes Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {schemesToDisplay.map((scheme, idx) => (
              <Card
                key={idx}
                className="group border-0 bg-white/60 dark:bg-white/10 backdrop-blur-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                      {scheme.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white shadow-md rounded-full px-3 py-1"
                    >
                      {scheme.category}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
                    {scheme.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t("Eligibility:")}</p>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t("Coverage:")}</p>
                      <p className="text-sm text-muted-foreground">{scheme.state}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white hover:opacity-90 transition rounded-xl"
                      onClick={() => window.open(scheme.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("View Official Website")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">{t("No schemes found matching your criteria.")}</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredSchemes.length > 0 && !allSchemesLoaded && (
            <div className="text-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="default"
                className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg hover:shadow-xl rounded-full transition-all hover:scale-105"
              >
                {t("Load More Schemes ({{remaining}} remaining)", { remaining: filteredSchemes.length - visibleSchemesLimit })}
              </Button>
            </div>
          )}

          {/* Additional Resources */}
          <Card className="mt-16 border-0 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">{t("Additional Resources")}</CardTitle>
              <CardDescription>{t("Official government portals for more information")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: t("Ministry of Agriculture"), url: "https://agriwelfare.gov.in/" },
                  { name: t("PM-KISAN Portal"), url: "https://pmkisan.gov.in" },
                  { name: t("Open Government Data"), url: "https://data.gov.in" }
                ].map((res, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start bg-gradient-to-r from-emerald-400/20 to-blue-400/20 hover:from-emerald-400 hover:to-blue-500 text-foreground hover:text-white transition-all duration-300 rounded-xl shadow-md"
                    onClick={() => window.open(res.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {res.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}