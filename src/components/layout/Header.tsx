// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { Button } from '@/components/ui/button';
// import { LanguageSelector } from '@/components/ui/language-selector';
// import { useAuth } from '@/contexts/AuthContext';
// import { Sprout, User, LogOut } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// export const Header: React.FC = () => {
//   const { t } = useTranslation();
//   const { user, profile, isAdmin, signOut } = useAuth();
//   const navigate = useNavigate();

//   // 🎯 You no longer need the handleSignOut function here.

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link to="/" className="flex items-center gap-2 font-bold text-xl">
//           <Sprout className="h-8 w-8 text-primary" />
//           <span className="bg-gradient-hero bg-clip-text text-transparent">
//             KrishiSanjivni
//           </span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-6">
//           <Link 
//             to="/" 
//             className="text-foreground/80 hover:text-foreground transition-colors"
//           >
//             {t('nav.home')}
//           </Link>
//           {/* This logic correctly shows links to non-admins and logged-out users */}
//           {!isAdmin && (
//             <>
//               <Link 
//                 to="/tools" 
//                 className="text-foreground/80 hover:text-foreground transition-colors"
//               >
//                 {t('nav.tools')}
//               </Link>
//               <Link 
//                 to="/warehouse" 
//                 className="text-foreground/80 hover:text-foreground transition-colors"
//               >
//                 {t('nav.warehouse')}
//               </Link>
//               <Link 
//                 to="/soil-check" 
//                 className="text-foreground/80 hover:text-foreground transition-colors"
//               >
//                 {t('nav.soilCheck')}
//               </Link>
//             </>
//           )}
//           {/* This logic correctly shows the admin link only to admins */}
//           {isAdmin && (
//             <Link 
//               to="/admin" 
//               className="text-foreground/80 hover:text-foreground transition-colors font-medium"
//             >
//               Admin Panel
//             </Link>
//           )}
//         </nav>

//         <div className="flex items-center gap-3">
//           <LanguageSelector />
          
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="sm" className="gap-2">
//                   <User className="h-4 w-4" />
//                   <span className="hidden sm:inline">
//                     {profile?.full_name || user.email?.split('@')[0]}
//                   </span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={() => navigate('/profile')}>
//                   <User className="mr-2 h-4 w-4" />
//                   {t('nav.profile')}
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 {/* 🎯 FIX: Call signOut directly. Let the AuthContext handle the redirect. */}
//                 <DropdownMenuItem onClick={signOut}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   {t('nav.logout')}
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <Button asChild variant="default">
//               <Link to="/auth">{t('nav.login')}</Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };









import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useAuth } from '@/contexts/AuthContext';
import { Sprout, User, LogOut,ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
    const { t } = useTranslation();
    const { user, profile, isAdmin, signOut } = useAuth();
    const navigate = useNavigate();

    // EXPLICIT LOGIC: Handles sign out AND redirects to the homepage
    const handleSignOut = async () => {
        await signOut();
        // Ensure explicit redirect to the homepage after sign out
        navigate('/'); 
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* LOGO: Always redirects to the Home page (/) for everyone */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-lg">
                                  <Sprout className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <div className="font-bold text-xl text-gray-900">KrishiSanjivni</div>
                                  <div className="text-xs text-green-600 font-medium">Growing Together</div>
                                </div>
                              </div>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {/* Home Link - Always Visible */}
                    <Link 
                        to="/" 
                        className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                        {t('nav.home')}
                    </Link>

                    {/* STANDARD USER LINKS: Visible to ALL (including Admin, as requested) */}
                    <Link 
                        to="/tools" 
                        className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                        {t('nav.tools')}
                    </Link>
                    <Link 
                        to="/warehouse" 
                        className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                        {t('nav.warehouse')}
                    </Link>
                    <Link 
                        to="/soil-check" 
                        className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                        {t('nav.soilCheck')}
                    </Link>
                    <Link 
                        to="/community" 
                        className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                        {t('Community')}
                    </Link>
                    {/* MORE DROPDOWN MENU */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors">
                                More
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 bg-popover z-50">
                            <DropdownMenuItem asChild>
                                <Link to="/resources" className="cursor-pointer">
                                    📚 Resources (Schemes & Yojanas)
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/weather" className="cursor-pointer">
                                    🌤️ Real-Time Weather
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/market-prices" className="cursor-pointer">
                                    💰 Market Prices
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    
                    {/* ADMIN PANEL LINK: Only Visible to Admins */}
                    {isAdmin && (
                        <Link 
                            to="/admin" 
                            className="text-foreground/80 hover:text-foreground transition-colors font-medium text-red-600 border border-red-600 px-2 py-1 rounded-full" 
                        >
                            Admin Panel
                        </Link>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    <LanguageSelector />
                    
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <User className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        {profile?.full_name || user.email?.split('@')[0]}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate('/profile')}>
                                    <User className="mr-2 h-4 w-4" />
                                    {t('nav.profile')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/payment-history')}>
                                    <User className="mr-2 h-4 w-4" />
                                    Payment History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    {t('nav.logout')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-700" asChild variant="default">
                            <Link to="/auth">{t('nav.login')}</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};