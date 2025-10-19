// import { Menu, X, Sprout } from 'lucide-react';
// import { useState } from 'react';

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = ['Services', 'Community', 'AI Assistant', 'About', 'Contact'];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-lg">
//               <Sprout className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <div className="font-bold text-xl text-gray-900">KrishiSanjivni</div>
//               <div className="text-xs text-green-600 font-medium">Growing Together</div>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <a
//                 key={link}
//                 href={`#${link.toLowerCase().replace(' ', '-')}`}
//                 className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group"
//               >
//                 {link}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
//               </a>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center gap-4">
//             <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
//               Sign In
//             </button>
//             <button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
//               Get Started
//             </button>
//           </div>

//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
//           <div className="container mx-auto px-4 py-6 space-y-4">
//             {navLinks.map((link) => (
//               <a
//                 key={link}
//                 href={`#${link.toLowerCase().replace(' ', '-')}`}
//                 className="block text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link}
//               </a>
//             ))}
//             <div className="pt-4 space-y-3 border-t border-gray-200">
//               <button className="w-full text-green-600 font-semibold hover:text-green-700 transition-colors py-2">
//                 Sign In
//               </button>
//               <button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg">
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
