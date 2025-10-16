import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface ToolBookingDialogProps {
  tool: {
    id: string;
    name: string;
    price_per_day: number;
    price_per_month: number;
    price_per_season: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ToolBookingDialog: React.FC<ToolBookingDialogProps> = ({ tool, open, onOpenChange }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rentalType, setRentalType] = useState<'daily' | 'monthly' | 'seasonal'>('daily');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [contactPhone, setContactPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);

 const calculateTotalCost = () => {
  if (!startDate || !endDate) return 0;
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  if (rentalType === 'daily') {
    return tool.price_per_day * days;
  } else if (rentalType === 'monthly') {
    const months = Math.ceil(days / 30);
    return tool.price_per_month * months;
  } else {
    return tool.price_per_season;
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to book a tool',
        variant: 'destructive'
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: 'Error',
        description: 'Please select start and end dates',
        variant: 'destructive'
      });
      return;
    }

    if (endDate < startDate) {
      toast({
        title: 'Error',
        description: 'End date must be after start date',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('tool_bookings')
        .insert({
          tool_id: tool.id,
          user_id: user.id,
          rental_type: rentalType,
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          total_cost: calculateTotalCost(),
          contact_phone: contactPhone,
          delivery_address: deliveryAddress,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Booking request submitted successfully! Check your profile for updates.'
      });

      onOpenChange(false);
      // Reset form
      setStartDate(undefined);
      setEndDate(undefined);
      setContactPhone('');
      setDeliveryAddress('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit booking',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {tool.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rental-type">Rental Type</Label>
            <Select value={rentalType} onValueChange={(value: any) => setRentalType(value)}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="daily">Daily (₹{tool.price_per_day}/day)</SelectItem>
    <SelectItem value="monthly">Monthly (₹{tool.price_per_month}/month)</SelectItem>
    <SelectItem value="seasonal">Seasonal (₹{tool.price_per_season}/season)</SelectItem>
  </SelectContent>
</Select>

          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < new Date() || (startDate ? date < startDate : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Contact Phone *</Label>
            <Input
              id="contact-phone"
              type="tel"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Your contact number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery-address">Delivery Address *</Label>
            <Textarea
              id="delivery-address"
              required
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your full delivery address"
              rows={3}
            />
          </div>

          {startDate && endDate && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Cost:</span>
                <span className="text-2xl font-bold">₹{calculateTotalCost().toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
