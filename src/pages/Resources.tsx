
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

interface Scheme {
  name: string;
  description: string;
  category: string;
  link: string;
  eligibility: string;
  state: string;
}

// Placeholder: all India schemes
const allIndiaSchemes: Scheme[] = [
   {
    name: "PM-KISAN",
    description: "Income support of ₹6,000 per year to farmers.",
    category: "Income Support",
    link: "https://pmkisan.gov.in/",
    eligibility: "All landholding farmers",
    state: "All India"
  },
  {
    name: "PMFBY",
    description: "Crop insurance covering yield loss due to natural calamities, pests & diseases.",
    category: "Insurance",
    link: "https://pmfby.gov.in/",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "Soil Health Card Scheme",
    description: "Provides farmers with soil health cards with crop-wise recommendations.",
    category: "Soil Health",
    link: "https://soilhealth.dac.gov.in/",
    eligibility: "All farmers with agricultural land",
    state: "All India"
  },
  {
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    description: "Promotes organic farming through cluster-based approach with financial assistance.",
    category: "Organic Farming",
    link: "https://agricoop.gov.in/en/schemes/paramparagat-krishi-vikas-yojana-pkvy",
    eligibility: "Groups practicing organic farming",
    state: "All India"
  },
  {
    name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    description: "Expand cultivated area with assured irrigation, improve water use efficiency.",
    category: "Irrigation",
    link: "https://pmksy.gov.in/",
    eligibility: "Farmers with agricultural land",
    state: "All India"
  },
  {
    name: "Kisan Credit Card (KCC)",
    description: "Provides timely credit support at concessional interest rates.",
    category: "Credit",
    link: "https://agricoop.gov.in/kisan-credit-card-scheme",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "National Mission for Sustainable Agriculture (NMSA)",
    description: "Promotes sustainable practices through soil, water, and climate resilience.",
    category: "Sustainable Agriculture",
    link: "https://agricoop.gov.in/en/national-mission-sustainable-agriculture-nmsa",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    description: "Financial assistance for farm machinery & equipment to boost mechanization.",
    category: "Mechanization",
    link: "https://agricoop.gov.in/en/sub-mission-agriculture-mechanization-smam",
    eligibility: "Farmers, SHGs, FPOs",
    state: "All India"
  },
  {
    name: "National Agricultural Market (eNAM)",
    description: "Promotes online trading of farm produce.",
    category: "Technology Adoption",
    link: "https://enam.gov.in/web/",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "Pradhan Mantri Kisan Mandhan Yojana",
    description: "Pension scheme for small and marginal farmers.",
    category: "Income Support",
    link: "https://pmkisan.gov.in/",
    eligibility: "Small & marginal farmers",
    state: "All India"
  },
  {
    name: "Kisan Samman Pension Scheme",
    description: "Pension for elderly farmers.",
    category: "Income Support",
    link: "https://pmkisan.gov.in/",
    eligibility: "Farmers above 60 years",
    state: "All India"
  },
  {
    name: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    description: "Development of fisheries and aquaculture.",
    category: "Technology Adoption",
    link: "https://pmmsy.dof.gov.in/",
    eligibility: "Fishermen & fish farmers",
    state: "All India"
  },
  {
    name: "National Food Security Mission (NFSM)",
    description: "Enhances production of rice, wheat, pulses, and coarse cereals.",
    category: "Sustainable Agriculture",
    link: "https://nfsm.gov.in/",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "Rashtriya Krishi Vikas Yojana (RKVY)",
    description: "Support for agriculture development and diversification.",
    category: "Sustainable Agriculture",
    link: "https://rkvy.nic.in/",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "Soil Health Management (SHM)",
    description: "Improves soil fertility through integrated nutrient management.",
    category: "Soil Health",
    link: "https://agricoop.gov.in/en/soil-health-management",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "National Mission on Agriculture Extension & Technology (NMAET)",
    description: "Improves technology adoption and farmer knowledge.",
    category: "Technology Adoption",
    link: "https://agricoop.gov.in/en/national-mission-agriculture-extension-technology-nmaet",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "National Cooperative Development Corporation (NCDC)",
    description: "Provides financial support for agri cooperatives.",
    category: "Credit",
    link: "https://ncdc.nic.in/",
    eligibility: "Farmers and cooperatives",
    state: "All India"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana - Loanee",
    description: "Insurance for loanee farmers against crop loss.",
    category: "Insurance",
    link: "https://pmfby.gov.in/",
    eligibility: "Loan-taking farmers",
    state: "All India"
  },
  {
    name: "Soil Health Card - Organic Inputs Support",
    description: "Encourages organic input use for better soil health.",
    category: "Organic Farming",
    link: "https://soilhealth.dac.gov.in/",
    eligibility: "All farmers",
    state: "All India"
  },
  {
    name: "Sub-Mission on Seed & Planting Material",
    description: "Promotes quality seed and planting material production.",
    category: "Technology Adoption",
    link: "https://agricoop.gov.in/en/sub-mission-seed-planting-material",
    eligibility: "All farmers",
    state: "All India"
  },
];

// Placeholder: add similar state-wise schemes covering all categories here
// Example for UP:



const upSchemes: Scheme[] = [
  {
    name: "Kisan Sarvhit Bima Yojana",
    description: "Insurance for accidental death, disability & hospitalization.",
    category: "Insurance",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "Farmer families",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Seed Subsidy Program",
    description: "Subsidy for certified seeds.",
    category: "Technology Adoption",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "All farmers in UP",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Kisan Credit Card",
    description: "Credit support for cultivation and allied activities.",
    category: "Credit",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "Farmers in UP",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Micro Irrigation Scheme",
    description: "Supports drip & sprinkler irrigation systems.",
    category: "Irrigation",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "Farmers in UP",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Soil Health Management",
    description: "Soil testing & fertility improvement.",
    category: "Soil Health",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "Farmers in UP",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Organic Farming Initiative",
    description: "Encourages organic farming clusters.",
    category: "Organic Farming",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "Interested farmers",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Sustainable Agriculture Support",
    description: "Promotes crop rotation & climate-resilient practices.",
    category: "Sustainable Agriculture",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "Farmers in UP",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Farmer Technology Program",
    description: "Training and demonstration of modern agricultural tech.",
    category: "Technology Adoption",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "Farmers in UP",
    state: "Uttar Pradesh"
  },
  {
    name: "UP Income Support Yojana",
    description: "Direct cash assistance for small farmers.",
    category: "Income Support",
    link: "https://upagripardarshi.gov.in/",
    eligibility: "All land-owning farmers",
    state: "Uttar Pradesh"
  },
];

// BIHAR
const biharSchemes: Scheme[] = [
  {
    name: "Bhavantar Bhugtan Yojana",
    description: "Price difference compensation for oilseeds & pulses.",
    category: "Income Support",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "Farmers cultivating notified crops",
    state: "Bihar"
  },
  {
    name: "Bihar State Crop Insurance Scheme",
    description: "Insurance coverage for crop loss due to natural disasters.",
    category: "Insurance",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "Farmers in Bihar",
    state: "Bihar"
  },
  {
    name: "Bihar Soil Health Program",
    description: "Soil testing and nutrient management.",
    category: "Soil Health",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "All farmers in Bihar",
    state: "Bihar"
  },
  {
    name: "Bihar Micro Irrigation Scheme",
    description: "Support for drip and sprinkler irrigation systems.",
    category: "Irrigation",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "All farmers in Bihar",
    state: "Bihar"
  },
  {
    name: "Bihar Kisan Credit Card",
    description: "Credit support for cultivation & allied activities.",
    category: "Credit",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "Farmers in Bihar",
    state: "Bihar"
  },
  {
    name: "Bihar Agricultural Mechanization Support",
    description: "Subsidy for farm machinery purchase.",
    category: "Mechanization",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "Farmers in Bihar",
    state: "Bihar"
  },
  {
    name: "Bihar Organic Farming Support",
    description: "Promotion of organic farming practices.",
    category: "Organic Farming",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "Interested farmers",
    state: "Bihar"
  },
  {
    name: "Bihar Technology Adoption Program",
    description: "Demonstration of modern agriculture technologies.",
    category: "Technology Adoption",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "Farmers in Bihar",
    state: "Bihar"
  },
  {
    name: "Bihar Sustainable Agriculture Initiative",
    description: "Promotion of crop rotation & climate resilient farming.",
    category: "Sustainable Agriculture",
    link: "https://agribihar.bihar.gov.in/",
    eligibility: "Farmers in Bihar",
    state: "Bihar"
  }
];

// TELANGANA
const telanganaSchemes: Scheme[] = [
  {
    name: "Rythu Bandhu Scheme",
    description: "Investment support for agriculture & horticulture crops.",
    category: "Income Support",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "Land-owning farmers",
    state: "Telangana"
  },
  {
    name: "Telangana Crop Insurance Scheme",
    description: "Insurance for crop losses due to natural disasters.",
    category: "Insurance",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "All farmers in Telangana",
    state: "Telangana"
  },
  {
    name: "Telangana Soil Health Program",
    description: "Soil testing and nutrient management support.",
    category: "Soil Health",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "All farmers",
    state: "Telangana"
  },
  {
    name: "Telangana Micro Irrigation Scheme",
    description: "Support for drip & sprinkler irrigation.",
    category: "Irrigation",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "Farmers in Telangana",
    state: "Telangana"
  },
  {
    name: "Telangana Kisan Credit Card",
    description: "Credit support for cultivation & allied activities.",
    category: "Credit",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "Farmers in Telangana",
    state: "Telangana"
  },
  {
    name: "Telangana Agricultural Mechanization",
    description: "Financial assistance for farm machinery.",
    category: "Mechanization",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "Farmers in Telangana",
    state: "Telangana"
  },
  {
    name: "Telangana Organic Farming Program",
    description: "Promotes organic farming clusters.",
    category: "Organic Farming",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "Interested farmers",
    state: "Telangana"
  },
  {
    name: "Telangana Technology Adoption Program",
    description: "Training in modern agri tech and practices.",
    category: "Technology Adoption",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "Farmers in Telangana",
    state: "Telangana"
  },
  {
    name: "Telangana Sustainable Agriculture Program",
    description: "Promotes eco-friendly farming practices.",
    category: "Sustainable Agriculture",
    link: "https://rythubandhu.telangana.gov.in/",
    eligibility: "Farmers in Telangana",
    state: "Telangana"
  }
];

// KARNATAKA
const karnatakaSchemes: Scheme[] = [
  {
    name: "Raita Siri Scheme",
    description: "Financial support for millet cultivation.",
    category: "Income Support",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "Millet farmers",
    state: "Karnataka"
  },
  {
    name: "Karnataka Crop Insurance Scheme",
    description: "Insurance coverage for crop losses.",
    category: "Insurance",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "All farmers in Karnataka",
    state: "Karnataka"
  },
  {
    name: "Karnataka Soil Health Program",
    description: "Soil testing & fertility improvement.",
    category: "Soil Health",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "All farmers",
    state: "Karnataka"
  },
  {
    name: "Krishi Bhagya Scheme",
    description: "Supports micro-irrigation & water conservation.",
    category: "Irrigation",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "Farmers in Karnataka",
    state: "Karnataka"
  },
  {
    name: "Karnataka Kisan Credit Card",
    description: "Credit support for cultivation & allied activities.",
    category: "Credit",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "Farmers in Karnataka",
    state: "Karnataka"
  },
  {
    name: "Karnataka Agricultural Mechanization",
    description: "Financial support for farm equipment.",
    category: "Mechanization",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "Farmers in Karnataka",
    state: "Karnataka"
  },
  {
    name: "Karnataka Organic Farming Program",
    description: "Encourages organic farming clusters.",
    category: "Organic Farming",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "Interested farmers",
    state: "Karnataka"
  },
  {
    name: "Karnataka Technology Adoption Program",
    description: "Demonstration of modern agriculture tech.",
    category: "Technology Adoption",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "Farmers in Karnataka",
    state: "Karnataka"
  },
  {
    name: "Karnataka Sustainable Agriculture Program",
    description: "Promotes eco-friendly & resilient farming.",
    category: "Sustainable Agriculture",
    link: "https://raitamitra.karnataka.gov.in/english",
    eligibility: "Farmers in Karnataka",
    state: "Karnataka"
  }
];


const maharashtraSchemes: Scheme[] = [
  { name: "Jalyukta Shivar Abhiyan", description: "Water conservation & micro-irrigation.", category: "Irrigation", link: "https://mahaagri.gov.in/", eligibility: "Farmers in drought-prone areas", state: "Maharashtra" },
  { name: "Maharashtra Crop Insurance", description: "Covers crop loss due to natural disasters.", category: "Insurance", link: "https://mahaagri.gov.in/", eligibility: "Farmers in Maharashtra", state: "Maharashtra" },
  { name: "Maharashtra Income Support", description: "Direct cash support for small farmers.", category: "Income Support", link: "https://mahaagri.gov.in/", eligibility: "All farmers", state: "Maharashtra" },
  { name: "Maharashtra Soil Health Program", description: "Soil testing & nutrient recommendations.", category: "Soil Health", link: "https://mahaagri.gov.in/", eligibility: "All farmers", state: "Maharashtra" },
  { name: "Maharashtra KCC", description: "Credit for cultivation & allied activities.", category: "Credit", link: "https://mahaagri.gov.in/", eligibility: "Farmers in Maharashtra", state: "Maharashtra" },
  { name: "Maharashtra Mechanization Subsidy", description: "Subsidy for farm machinery & equipment.", category: "Mechanization", link: "https://mahaagri.gov.in/", eligibility: "Farmers & SHGs", state: "Maharashtra" },
  { name: "Maharashtra Organic Farming", description: "Promotion of organic farming practices.", category: "Organic Farming", link: "https://mahaagri.gov.in/", eligibility: "Interested farmers", state: "Maharashtra" },
  { name: "Maharashtra Technology Program", description: "Modern agri-tech adoption training.", category: "Technology Adoption", link: "https://mahaagri.gov.in/", eligibility: "Farmers in Maharashtra", state: "Maharashtra" },
  { name: "Maharashtra Sustainable Agri Program", description: "Eco-friendly farming & crop rotation.", category: "Sustainable Agriculture", link: "https://mahaagri.gov.in/", eligibility: "All farmers", state: "Maharashtra" }
];

const gujaratSchemes: Scheme[] = [
  { name: "CM Kisan Sahay Yojana", description: "Compensation for crop loss due to calamities.", category: "Insurance", link: "https://agri.gujarat.gov.in/", eligibility: "Farmers cultivating notified crops", state: "Gujarat" },
  { name: "Gujarat Seed Subsidy", description: "Subsidy for certified seeds.", category: "Technology Adoption", link: "https://agri.gujarat.gov.in/", eligibility: "All farmers", state: "Gujarat" },
  { name: "Gujarat Income Support", description: "Direct cash assistance for farmers.", category: "Income Support", link: "https://agri.gujarat.gov.in/", eligibility: "All farmers", state: "Gujarat" },
  { name: "Gujarat Soil Health Program", description: "Soil testing and fertility improvement.", category: "Soil Health", link: "https://agri.gujarat.gov.in/", eligibility: "All farmers", state: "Gujarat" },
  { name: "Gujarat KCC", description: "Credit for cultivation & equipment.", category: "Credit", link: "https://agri.gujarat.gov.in/", eligibility: "All farmers", state: "Gujarat" },
  { name: "Gujarat Mechanization Scheme", description: "Support for farm machinery.", category: "Mechanization", link: "https://agri.gujarat.gov.in/", eligibility: "Farmers & SHGs", state: "Gujarat" },
  { name: "Gujarat Organic Farming Program", description: "Promotes organic farming clusters.", category: "Organic Farming", link: "https://agri.gujarat.gov.in/", eligibility: "Interested farmers", state: "Gujarat" },
  { name: "Gujarat Sustainable Agri Program", description: "Promotes eco-friendly & resilient practices.", category: "Sustainable Agriculture", link: "https://agri.gujarat.gov.in/", eligibility: "Farmers", state: "Gujarat" }
];

const odishaSchemes: Scheme[] = [
  { name: "Odisha Farmer Assistance", description: "Subsidies for seeds, fertilizers, irrigation.", category: "Income Support", link: "https://agriculture.odisha.gov.in/", eligibility: "All farmers", state: "Odisha" },
  { name: "Odisha Crop Insurance", description: "Insurance support against crop loss.", category: "Insurance", link: "https://agriculture.odisha.gov.in/", eligibility: "Farmers in Odisha", state: "Odisha" },
  { name: "Odisha Soil Health", description: "Soil testing & management programs.", category: "Soil Health", link: "https://agriculture.odisha.gov.in/", eligibility: "All farmers", state: "Odisha" },
  { name: "Odisha Micro Irrigation", description: "Drip & sprinkler irrigation assistance.", category: "Irrigation", link: "https://agriculture.odisha.gov.in/", eligibility: "All farmers", state: "Odisha" },
  { name: "Odisha KCC", description: "Credit for cultivation & allied activities.", category: "Credit", link: "https://agriculture.odisha.gov.in/", eligibility: "Farmers", state: "Odisha" },
  { name: "Odisha Mechanization", description: "Support for farm machinery.", category: "Mechanization", link: "https://agriculture.odisha.gov.in/", eligibility: "Farmers", state: "Odisha" },
  { name: "Odisha Organic Farming", description: "Promotion of organic farming clusters.", category: "Organic Farming", link: "https://agriculture.odisha.gov.in/", eligibility: "Interested farmers", state: "Odisha" },
  { name: "Odisha Technology Adoption", description: "Modern agri tech training.", category: "Technology Adoption", link: "https://agriculture.odisha.gov.in/", eligibility: "All farmers", state: "Odisha" },
  { name: "Odisha Sustainable Agriculture", description: "Promotes resilient & eco-friendly practices.", category: "Sustainable Agriculture", link: "https://agriculture.odisha.gov.in/", eligibility: "Farmers", state: "Odisha" }
];

const tamilNaduSchemes: Scheme[] = [
  { name: "TN Crop Insurance", description: "State crop insurance covering yield losses.", category: "Insurance", link: "https://www.tn.gov.in/agriculture", eligibility: "Farmers in Tamil Nadu", state: "Tamil Nadu" },
  { name: "TN Micro Irrigation Scheme", description: "Supports drip & sprinkler irrigation.", category: "Irrigation", link: "https://www.tn.gov.in/agriculture", eligibility: "Farmers in Tamil Nadu", state: "Tamil Nadu" },
  { name: "TN Soil Health Program", description: "Soil testing & nutrient recommendations.", category: "Soil Health", link: "https://www.tn.gov.in/agriculture", eligibility: "All farmers", state: "Tamil Nadu" },
  { name: "TN KCC", description: "Credit support for cultivation & allied activities.", category: "Credit", link: "https://www.tn.gov.in/agriculture", eligibility: "Farmers in Tamil Nadu", state: "Tamil Nadu" },
  { name: "TN Income Support Yojana", description: "Direct cash assistance for small farmers.", category: "Income Support", link: "https://www.tn.gov.in/agriculture", eligibility: "All farmers", state: "Tamil Nadu" },
  { name: "TN Mechanization Subsidy", description: "Subsidy for farm machinery & equipment.", category: "Mechanization", link: "https://www.tn.gov.in/agriculture", eligibility: "Farmers & SHGs", state: "Tamil Nadu" },
  { name: "TN Organic Farming Program", description: "Promotes organic farming clusters.", category: "Organic Farming", link: "https://www.tn.gov.in/agriculture", eligibility: "Interested farmers", state: "Tamil Nadu" },
  { name: "TN Technology Adoption Program", description: "Training for modern agri-tech adoption.", category: "Technology Adoption", link: "https://www.tn.gov.in/agriculture", eligibility: "Farmers in Tamil Nadu", state: "Tamil Nadu" },
  { name: "TN Sustainable Agriculture", description: "Promotes eco-friendly & resilient practices.", category: "Sustainable Agriculture", link: "https://www.tn.gov.in/agriculture", eligibility: "Farmers in Tamil Nadu", state: "Tamil Nadu" }
];

const punjabSchemes: Scheme[] = [
  { name: "Punjab Crop Insurance", description: "Insurance against crop loss due to natural disasters.", category: "Insurance", link: "https://agriculture.punjab.gov.in/", eligibility: "Farmers in Punjab", state: "Punjab" },
  { name: "Punjab Micro Irrigation", description: "Support for drip & sprinkler irrigation.", category: "Irrigation", link: "https://agriculture.punjab.gov.in/", eligibility: "Farmers in Punjab", state: "Punjab" },
  { name: "Punjab Soil Health", description: "Soil testing & nutrient recommendations.", category: "Soil Health", link: "https://agriculture.punjab.gov.in/", eligibility: "Farmers", state: "Punjab" },
  { name: "Punjab KCC", description: "Credit for cultivation & allied activities.", category: "Credit", link: "https://agriculture.punjab.gov.in/", eligibility: "Farmers", state: "Punjab" },
  { name: "Punjab Income Support", description: "Direct cash assistance for small farmers.", category: "Income Support", link: "https://agriculture.punjab.gov.in/", eligibility: "All farmers", state: "Punjab" },
  { name: "Punjab Mechanization Scheme", description: "Subsidy for farm machinery & equipment.", category: "Mechanization", link: "https://agriculture.punjab.gov.in/", eligibility: "Farmers & SHGs", state: "Punjab" },
  { name: "Punjab Organic Farming Program", description: "Promotion of organic farming clusters.", category: "Organic Farming", link: "https://agriculture.punjab.gov.in/", eligibility: "Interested farmers", state: "Punjab" },
  { name: "Punjab Technology Adoption", description: "Training for modern agricultural tech.", category: "Technology Adoption", link: "https://agriculture.punjab.gov.in/", eligibility: "Farmers", state: "Punjab" },
  { name: "Punjab Sustainable Agriculture", description: "Climate-resilient & eco-friendly practices.", category: "Sustainable Agriculture", link: "https://agriculture.punjab.gov.in/", eligibility: "Farmers", state: "Punjab" }
];

const rajasthanSchemes: Scheme[] = [
  { name: "Rajasthan Crop Insurance", description: "Insurance for crop loss due to natural disasters.", category: "Insurance", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Farmers in Rajasthan", state: "Rajasthan" },
  { name: "Rajasthan Micro Irrigation", description: "Drip & sprinkler irrigation support.", category: "Irrigation", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Farmers in Rajasthan", state: "Rajasthan" },
  { name: "Rajasthan Soil Health", description: "Soil testing & nutrient improvement.", category: "Soil Health", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Farmers", state: "Rajasthan" },
  { name: "Rajasthan KCC", description: "Credit for cultivation & allied activities.", category: "Credit", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Farmers", state: "Rajasthan" },
  { name: "Rajasthan Income Support", description: "Direct cash assistance for farmers.", category: "Income Support", link: "https://agriculture.rajasthan.gov.in/", eligibility: "All farmers", state: "Rajasthan" },
  { name: "Rajasthan Mechanization Program", description: "Subsidy for farm machinery & equipment.", category: "Mechanization", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Farmers & SHGs", state: "Rajasthan" },
  { name: "Rajasthan Organic Farming", description: "Promotion of organic farming clusters.", category: "Organic Farming", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Interested farmers", state: "Rajasthan" },
  { name: "Rajasthan Technology Adoption", description: "Training for modern agri-tech adoption.", category: "Technology Adoption", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Farmers", state: "Rajasthan" },
  { name: "Rajasthan Sustainable Agriculture", description: "Eco-friendly & climate-resilient practices.", category: "Sustainable Agriculture", link: "https://agriculture.rajasthan.gov.in/", eligibility: "Farmers", state: "Rajasthan" }
];

const mpSchemes: Scheme[] = [
  { name: "MP Crop Insurance", description: "Insurance for crop loss due to natural disasters.", category: "Insurance", link: "https://mpagriculture.in/", eligibility: "Farmers in MP", state: "Madhya Pradesh" },
  { name: "MP Micro Irrigation", description: "Support for drip & sprinkler irrigation.", category: "Irrigation", link: "https://mpagriculture.in/", eligibility: "Farmers in MP", state: "Madhya Pradesh" },
  { name: "MP Soil Health Program", description: "Soil testing & nutrient management.", category: "Soil Health", link: "https://mpagriculture.in/", eligibility: "Farmers in MP", state: "Madhya Pradesh" },
  { name: "MP KCC", description: "Credit for cultivation & allied activities.", category: "Credit", link: "https://mpagriculture.in/", eligibility: "Farmers", state: "Madhya Pradesh" },
  { name: "MP Income Support", description: "Direct cash assistance for small farmers.", category: "Income Support", link: "https://mpagriculture.in/", eligibility: "All farmers", state: "Madhya Pradesh" },
  { name: "MP Mechanization Scheme", description: "Support for farm machinery & equipment.", category: "Mechanization", link: "https://mpagriculture.in/", eligibility: "Farmers & SHGs", state: "Madhya Pradesh" },
  { name: "MP Organic Farming", description: "Promotes organic farming clusters.", category: "Organic Farming", link: "https://mpagriculture.in/", eligibility: "Interested farmers", state: "Madhya Pradesh" },
  { name: "MP Technology Adoption", description: "Modern agri-tech training & demos.", category: "Technology Adoption", link: "https://mpagriculture.in/", eligibility: "Farmers", state: "Madhya Pradesh" },
  { name: "MP Sustainable Agriculture", description: "Promotes crop rotation & eco-friendly practices.", category: "Sustainable Agriculture", link: "https://mpagriculture.in/", eligibility: "Farmers", state: "Madhya Pradesh" }
];

const cgSchemes: Scheme[] = [
  { name: "CG Crop Insurance", description: "Insurance for yield loss due to natural disasters.", category: "Insurance", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Farmers in CG", state: "Chhattisgarh" },
  { name: "CG Micro Irrigation", description: "Support for drip & sprinkler systems.", category: "Irrigation", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Farmers in CG", state: "Chhattisgarh" },
  { name: "CG Soil Health Program", description: "Soil testing & fertility improvement.", category: "Soil Health", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Farmers in CG", state: "Chhattisgarh" },
  { name: "CG KCC", description: "Credit for cultivation & allied activities.", category: "Credit", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Farmers", state: "Chhattisgarh" },
  { name: "CG Income Support", description: "Direct cash assistance for farmers.", category: "Income Support", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "All farmers", state: "Chhattisgarh" },
  { name: "CG Mechanization Scheme", description: "Subsidy for farm machinery.", category: "Mechanization", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Farmers & SHGs", state: "Chhattisgarh" },
  { name: "CG Organic Farming", description: "Promotion of organic farming clusters.", category: "Organic Farming", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Interested farmers", state: "Chhattisgarh" },
  { name: "CG Technology Adoption", description: "Training for modern agri-tech adoption.", category: "Technology Adoption", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Farmers", state: "Chhattisgarh" },
  { name: "CG Sustainable Agriculture", description: "Eco-friendly & climate-resilient farming practices.", category: "Sustainable Agriculture", link: "https://chhattisgarh.nic.in/en/agriculture", eligibility: "Farmers", state: "Chhattisgarh" }
];


const wbSchemes: Scheme[] = [
  { name: "WB Crop Insurance", description: "Covers yield loss due to natural disasters.", category: "Insurance", link: "https://wbagriculture.in/", eligibility: "Farmers in WB", state: "West Bengal" },
  { name: "WB Micro Irrigation", description: "Support for drip & sprinkler systems.", category: "Irrigation", link: "https://wbagriculture.in/", eligibility: "Farmers in WB", state: "West Bengal" },
  { name: "WB Soil Health Program", description: "Soil testing & nutrient management.", category: "Soil Health", link: "https://wbagriculture.in/", eligibility: "Farmers in WB", state: "West Bengal" },
  { name: "WB KCC", description: "Credit support for cultivation & allied activities.", category: "Credit", link: "https://wbagriculture.in/", eligibility: "Farmers", state: "West Bengal" },
  { name: "WB Income Support Yojana", description: "Direct cash assistance for small farmers.", category: "Income Support", link: "https://wbagriculture.in/", eligibility: "All farmers", state: "West Bengal" },
  { name: "WB Mechanization Program", description: "Support for farm machinery & equipment.", category: "Mechanization", link: "https://wbagriculture.in/", eligibility: "Farmers & SHGs", state: "West Bengal" },
  { name: "WB Organic Farming", description: "Promotion of organic farming clusters.", category: "Organic Farming", link: "https://wbagriculture.in/", eligibility: "Interested farmers", state: "West Bengal" },
  { name: "WB Technology Adoption", description: "Training for modern agri-tech adoption.", category: "Technology Adoption", link: "https://wbagriculture.in/", eligibility: "Farmers", state: "West Bengal" },
  { name: "WB Sustainable Agriculture", description: "Promotes climate-resilient & eco-friendly practices.", category: "Sustainable Agriculture", link: "https://wbagriculture.in/", eligibility: "Farmers", state: "West Bengal" }
];

const andhraPradeshSchemes: Scheme[] = [
  { name: "AP Rythu Bima Yojana", description: "Crop insurance & financial assistance.", category: "Insurance", link: "https://apaid.ap.gov.in/", eligibility: "Farmers in AP", state: "Andhra Pradesh" },
  { name: "AP Micro Irrigation", description: "Supports drip & sprinkler irrigation.", category: "Irrigation", link: "https://apaid.ap.gov.in/", eligibility: "Farmers in AP", state: "Andhra Pradesh" },
  { name: "AP Soil Health Program", description: "Soil testing & nutrient recommendations.", category: "Soil Health", link: "https://apaid.ap.gov.in/", eligibility: "All farmers", state: "Andhra Pradesh" },
  { name: "AP KCC", description: "Credit for cultivation & allied activities.", category: "Credit", link: "https://apaid.ap.gov.in/", eligibility: "Farmers", state: "Andhra Pradesh" },
  { name: "AP Income Support", description: "Direct cash assistance for small farmers.", category: "Income Support", link: "https://apaid.ap.gov.in/", eligibility: "All farmers", state: "Andhra Pradesh" },
  { name: "AP Mechanization Program", description: "Subsidy for farm machinery & equipment.", category: "Mechanization", link: "https://apaid.ap.gov.in/", eligibility: "Farmers & SHGs", state: "Andhra Pradesh" },
  { name: "AP Organic Farming", description: "Promotion of organic farming clusters.", category: "Organic Farming", link: "https://apaid.ap.gov.in/", eligibility: "Interested farmers", state: "Andhra Pradesh" },
  { name: "AP Technology Adoption", description: "Training for modern agri-tech adoption.", category: "Technology Adoption", link: "https://apaid.ap.gov.in/", eligibility: "Farmers", state: "Andhra Pradesh" },
  { name: "AP Sustainable Agriculture", description: "Promotes climate-resilient & eco-friendly practices.", category: "Sustainable Agriculture", link: "https://apaid.ap.gov.in/", eligibility: "Farmers", state: "Andhra Pradesh" }
];

const haryanaSchemes: Scheme[] = [
  { name: "Haryana Crop Insurance", description: "Insurance for crop loss due to natural disasters.", category: "Insurance", link: "https://haryanaagriculture.gov.in/", eligibility: "Farmers in Haryana", state: "Haryana" },
  { name: "Haryana Micro Irrigation", description: "Support for drip & sprinkler irrigation.", category: "Irrigation", link: "https://haryanaagriculture.gov.in/", eligibility: "Farmers in Haryana", state: "Haryana" },
  { name: "Haryana Soil Health Program", description: "Soil testing & fertility improvement.", category: "Soil Health", link: "https://haryanaagriculture.gov.in/", eligibility: "Farmers", state: "Haryana" },
  { name: "Haryana KCC", description: "Credit support for cultivation & allied activities.", category: "Credit", link: "https://haryanaagriculture.gov.in/", eligibility: "Farmers", state: "Haryana" },
  { name: "Haryana Income Support", description: "Direct cash assistance for small farmers.", category: "Income Support", link: "https://haryanaagriculture.gov.in/", eligibility: "All farmers", state: "Haryana" },
  { name: "Haryana Mechanization", description: "Support for farm machinery & equipment.", category: "Mechanization", link: "https://haryanaagriculture.gov.in/", eligibility: "Farmers & SHGs", state: "Haryana" },
  { name: "Haryana Organic Farming", description: "Promotes organic farming clusters.", category: "Organic Farming", link: "https://haryanaagriculture.gov.in/", eligibility: "Interested farmers", state: "Haryana" },
  { name: "Haryana Technology Adoption", description: "Modern agri-tech training & demos.", category: "Technology Adoption", link: "https://haryanaagriculture.gov.in/", eligibility: "Farmers", state: "Haryana" },
  { name: "Haryana Sustainable Agriculture", description: "Promotes eco-friendly & resilient farming.", category: "Sustainable Agriculture", link: "https://haryanaagriculture.gov.in/", eligibility: "Farmers", state: "Haryana" }
];


const schemes: Scheme[] = [
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
];


const categories = [
  "All", "Income Support", "Insurance", "Soil Health", "Irrigation",
  "Credit", "Mechanization", "Organic Farming", "Technology Adoption",
  "Sustainable Agriculture"
];

const statesList = [
  "All States", "All India", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Gujarat",
  "Haryana", "Karnataka", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

const INITIAL_SCHEMES_LIMIT = 9;
const SCHEMES_PER_LOAD = 9;

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All States');
  const [visibleSchemesLimit, setVisibleSchemesLimit] = useState(INITIAL_SCHEMES_LIMIT);

  const filteredSchemes = schemes
    .filter(scheme => {
      const matchesSearch =
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || scheme.category === selectedCategory;

      const matchesState =
        selectedState === 'All States' ||
        (selectedState === 'All India' && scheme.state === 'All India') ||
        (selectedState !== 'All India' && (scheme.state === selectedState || scheme.state === 'All India'));

      return matchesSearch && matchesCategory && matchesState;
    })
    .sort((a, b) => {
      if (a.state === selectedState) return -1;
      if (b.state === selectedState) return 1;
      return 0;
    });

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
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              Government Schemes & Yojanas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore central and state government schemes designed to empower Indian farmers 🌾
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-10 border-0 shadow-lg bg-white/40 dark:bg-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schemes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 focus:ring-2 focus:ring-emerald-400 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl"
                  />
                </div>

                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full md:w-[200px] bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border-0">
                    <SelectValue>{selectedState !== "All States" ? selectedState : "Select State"}</SelectValue>
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
                      <p className="text-sm font-semibold text-foreground">Eligibility:</p>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Coverage:</p>
                      <p className="text-sm text-muted-foreground">{scheme.state}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white hover:opacity-90 transition rounded-xl"
                      onClick={() => window.open(scheme.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Official Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No schemes found matching your criteria.</p>
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
                Load More Schemes ({filteredSchemes.length - visibleSchemesLimit} remaining)
              </Button>
            </div>
          )}

          {/* Additional Resources */}
          <Card className="mt-16 border-0 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Additional Resources</CardTitle>
              <CardDescription>Official government portals for more information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Ministry of Agriculture", url: "https://agriwelfare.gov.in/" },
                  { name: "PM-KISAN Portal", url: "https://pmkisan.gov.in" },
                  { name: "Open Government Data", url: "https://data.gov.in" }
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
