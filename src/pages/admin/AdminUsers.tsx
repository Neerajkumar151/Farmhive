import React, { useEffect, useState } from 'react';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface UserWithRoles {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  roles: string[];
}

export const AdminUsers: React.FC = () => {
  const { loading: authLoading } = useAdminCheck();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Fetch profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive'
      });
      return;
    }

    // Fetch all user roles
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles' as any)
      .select('*');

    if (rolesError) {
      toast({
        title: 'Error',
        description: 'Failed to fetch user roles',
        variant: 'destructive'
      });
      return;
    }

    // Combine data
    const usersWithRoles = profilesData.map(profile => {
      const userRoles = (rolesData as any[])
        .filter((role: any) => role.user_id === profile.user_id)
        .map((role: any) => role.role);

      return {
        ...profile,
        roles: userRoles
      };
    });

    setUsers(usersWithRoles);
  };

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Manage Users</h1>
        <p className="text-muted-foreground">View all users and their roles</p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name || 'N/A'}</TableCell>
                <TableCell>{user.phone || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {user.roles.map((role, index) => (
                      <Badge
                        key={index}
                        variant={role === 'admin' ? 'default' : 'secondary'}
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString('en-IN')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
