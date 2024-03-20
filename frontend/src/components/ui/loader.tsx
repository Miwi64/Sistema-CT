import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loader = ({ className }: { className?: string }) => {
    return (
        <div className='flex w-full h-[400px] justify-center items-center'>
            <Loader2
                className={cn('h-20 w-20 text-primary/60 animate-spin', className)}
            />
        </div>
    );
};

export default Loader;