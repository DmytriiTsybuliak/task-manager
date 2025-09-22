import Loader from '@/components/Loader';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  );
}
