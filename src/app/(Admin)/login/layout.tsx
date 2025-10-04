export default function LoginLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
         <div className="flex justify-center w-full max-w-md p-8 bg-gray-950/70 rounded-2xl shadow-xl backdrop-blur-sm">
            {children}
         </div>
      </div>
   );
}
