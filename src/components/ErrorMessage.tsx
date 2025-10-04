function ErrorMessage({ error }: { error: unknown }) {
   if (!error) return null;
   return (
      <p className="text-red-500 text-sm">
         {error instanceof Error ? error.message : String(error)}
      </p>
   );
}

export default ErrorMessage;
