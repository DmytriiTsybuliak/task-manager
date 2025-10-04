interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   id: string;
}

export default function Input({ label, id, ...props }: InputProps) {
   return (
      <div className="flex flex-col gap-1">
         <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
         </label>
         <input
            id={id}
            {...props}
            className={`border rounded p-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
               props.className ?? ''
            }`}
         />
      </div>
   );
}
