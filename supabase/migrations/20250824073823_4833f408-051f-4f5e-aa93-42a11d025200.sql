-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('farmer', 'tool_provider', 'warehouse_owner');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'farmer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tools table
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  price_per_day DECIMAL(10,2) NOT NULL,
  price_per_month DECIMAL(10,2) NOT NULL,
  price_per_season DECIMAL(10,2) NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  availability BOOLEAN DEFAULT true,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create warehouses table
CREATE TABLE public.warehouses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  price_per_sqm_day DECIMAL(10,2) NOT NULL,
  price_per_sqm_month DECIMAL(10,2) NOT NULL,
  total_space_sqm INTEGER NOT NULL,
  available_space_sqm INTEGER NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create warehouse bookings table
CREATE TABLE public.warehouse_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  warehouse_id UUID NOT NULL REFERENCES public.warehouses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  space_sqm INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tool bookings table
CREATE TABLE public.tool_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  rental_type TEXT NOT NULL CHECK (rental_type IN ('daily', 'monthly', 'seasonal')),
  total_cost DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  contact_phone TEXT,
  delivery_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create soil checks table
CREATE TABLE public.soil_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  location TEXT,
  moisture_percent DECIMAL(5,2),
  ph_level DECIMAL(4,2),
  nitrogen_level TEXT,
  phosphorus_level TEXT,
  potassium_level TEXT,
  organic_matter_percent DECIMAL(5,2),
  crop_type TEXT,
  soil_type TEXT,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warehouse_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_checks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for tools
CREATE POLICY "Anyone can view tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Tool providers can insert tools" ON public.tools FOR INSERT WITH CHECK (
  auth.uid() = owner_id AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'tool_provider')
);
CREATE POLICY "Owners can update their tools" ON public.tools FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for warehouses
CREATE POLICY "Anyone can view warehouses" ON public.warehouses FOR SELECT USING (true);
CREATE POLICY "Warehouse owners can insert warehouses" ON public.warehouses FOR INSERT WITH CHECK (
  auth.uid() = owner_id AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'warehouse_owner')
);
CREATE POLICY "Owners can update their warehouses" ON public.warehouses FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their bookings" ON public.warehouse_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.warehouse_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Warehouse owners can view bookings for their warehouses" ON public.warehouse_bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.warehouses WHERE id = warehouse_id AND owner_id = auth.uid())
);

CREATE POLICY "Users can view their tool bookings" ON public.tool_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create tool bookings" ON public.tool_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tool owners can view bookings for their tools" ON public.tool_bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tools WHERE id = tool_id AND owner_id = auth.uid())
);

-- RLS Policies for soil checks
CREATE POLICY "Users can view own soil checks" ON public.soil_checks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create soil checks" ON public.soil_checks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'farmer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON public.tools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_warehouses_updated_at BEFORE UPDATE ON public.warehouses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_warehouse_bookings_updated_at BEFORE UPDATE ON public.warehouse_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tool_bookings_updated_at BEFORE UPDATE ON public.tool_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
